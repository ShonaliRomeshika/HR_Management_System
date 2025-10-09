package com.hdsr.hr.auth;

import com.hdsr.hr.company.model.Company;
import com.hdsr.hr.company.repository.CompanyRepository;
import com.hdsr.hr.user.model.Role;
import com.hdsr.hr.user.model.User;
import com.hdsr.hr.user.repository.UserRepository;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final CompanyRepository companyRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(CompanyRepository companyRepo,
                       UserRepository userRepo,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.companyRepo = companyRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register company + super admin + return JWT with companyId embedded
     */
    public AuthResponse register(RegisterRequestDTO req) {
        // Create new company
        Company company = new Company();
        company.setName(req.getCompanyName());
        company.setEmail(req.getCompanyEmail());
        company.setAddress(req.getAddress());
        company.setPhoneNumber(req.getPhoneNumber());
        companyRepo.save(company);

        // Create super admin user for that company
        User superAdmin = new User();
        superAdmin.setUsername(req.getSuperAdminUsername());
        superAdmin.setEmail(req.getSuperAdminEmail());
        superAdmin.setPassword(passwordEncoder.encode(req.getPassword()));
        superAdmin.setRole(Role.SUPER_ADMIN);
        superAdmin.setCompanyId(company.getId());
        userRepo.save(superAdmin);

        // Generate JWT token that includes companyId + role
        String token = jwtUtil.generateToken(superAdmin);

        // Return response
        return new AuthResponse(token);
    }

    /**
     * Login and return JWT with companyId + role
     */
    public AuthResponse login(LoginRequestDTO req) {
        // Authenticate credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        // Fetch user from DB
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT with claims (companyId + role)
        String token = jwtUtil.generateToken(user);

        // Return response
        return new AuthResponse(token);
    }
}
