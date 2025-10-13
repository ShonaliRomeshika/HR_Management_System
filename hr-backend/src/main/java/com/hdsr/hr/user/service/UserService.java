package com.hdsr.hr.user.service;

import com.hdsr.hr.user.model.Role;
import com.hdsr.hr.user.model.User;
import com.hdsr.hr.user.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // ---  Spring Security: load user by email for authentication ---
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    // --- Add a new admin user for the same company ---
    public User addUser(String name, String email, UUID currentUserId) {
        UUID companyId = getCompanyIdOfCurrentUser(currentUserId);

        // 1. Generate a random password
        String plainPassword = generateRandomPassword();

        // 2️. Encode password
        String encodedPassword = passwordEncoder.encode(plainPassword);

        // 3️. Create the new user
        User newUser = new User();
        newUser.setUsername(name);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setCompanyId(companyId);
        newUser.setRole(Role.ADMIN);

        // 4️. Save to DB
        User savedUser = userRepository.save(newUser);

        // 5️. Send credentials via email
        emailService.sendAccountCreationEmail(savedUser.getEmail(), plainPassword);

        return savedUser;
    }

    // --- Helper methods ---
    private UUID getCompanyIdOfCurrentUser(UUID userId) {
        return userRepository.findById(userId)
                .map(User::getCompanyId)
                .orElseThrow(() -> new RuntimeException("Invalid user ID"));
    }

    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[12];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
    
    public List<User> getUsersByCompany(UUID currentUserId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        UUID companyId = currentUser.getCompanyId();
        return userRepository.findAllByCompanyId(companyId);
    }
    
    public void removeUser(UUID currentUserId, UUID targetUserId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        if (!targetUser.getCompanyId().equals(currentUser.getCompanyId())) {
            throw new RuntimeException("You cannot delete users from another company");
        }

        userRepository.delete(targetUser);
    }

}

