package com.hdsr.hr.auth;

import com.hdsr.hr.user.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final String SECRET = "Z2SWfRZDri7ix47vKGy+Wqhu2zoU53Lm9mnfES98ouidWDwYfP+biWcSupXfFxdyoXLsED7DvWZ3vT5ZHv+Q6A==";
    private final long EXPIRATION = 1000 * 60 * 60 * 10; // 10 hours

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    /**
     * Generate JWT including companyId + role (based on your User entity)
     */
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail()) // Email used as login identifier
                .claim("companyId", user.getCompanyId() != null ? user.getCompanyId().toString() : null)
                .claim("role", user.getRole() != null ? user.getRole().name() : null)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract email (username) from token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extract companyId (so you can identify company automatically)
     */
    public UUID extractCompanyId(String token) {
        Claims claims = extractAllClaims(token);
        Object companyIdObj = claims.get("companyId");
        if (companyIdObj == null) return null;
        try {
            return UUID.fromString(companyIdObj.toString());
        } catch (IllegalArgumentException e) {
            return null; // In case the value is malformed
        }
    }

    /**
     * Extract user role from token
     */
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        Object roleObj = claims.get("role");
        return roleObj != null ? roleObj.toString() : null;
    }

    /**
     * Validate token: username match + expiration
     */
    public boolean validateToken(String token, String userEmail) {
        final String username = extractUsername(token);
        return (username.equals(userEmail) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
