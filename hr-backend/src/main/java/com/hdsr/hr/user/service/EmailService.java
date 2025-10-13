package com.hdsr.hr.user.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendAccountCreationEmail(String to, String password) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Welcome to PeopleRecords — Your Account Details");

            String htmlTemplate = """
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background-color: #f4f4f9;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 40px auto;
                            background-color: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            padding: 30px;
                            color: #333333;
                        }
                        .header {
                            text-align: center;
                            border-bottom: 3px solid #3f51b5;
                            padding-bottom: 10px;
                        }
                        .header h1 {
                            color: #3f51b5;
                            margin-bottom: 5px;
                        }
                        .content {
                            margin-top: 20px;
                            line-height: 1.6;
                        }
                        .credentials-box {
                            background-color: #f0f2ff;
                            border-left: 4px solid #3f51b5;
                            padding: 15px 20px;
                            border-radius: 8px;
                            margin: 20px 0;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            font-size: 0.9rem;
                            color: #777777;
                        }
                        .btn {
                            display: inline-block;
                            background-color: #3f51b5;
                            color: #ffffff !important;
                            text-decoration: none;
                            padding: 10px 18px;
                            border-radius: 6px;
                            margin-top: 15px;
                            transition: background-color 0.3s;
                        }
                        .btn:hover {
                            background-color: #303f9f;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>PeopleRecords</h1>
                            <p>Your HR Management Partner</p>
                        </div>

                        <div class="content">
                            <p>Hi there,</p>
                            <p>Welcome to <strong>PeopleRecords</strong>! Your account has been successfully created.</p>
                            
                            <p>You can log in using your email and the temporary password below:</p>

                            <div class="credentials-box">
                                <p><strong>Email:</strong> %s</p>
                                <p><strong>Temporary Password:</strong> %s</p>
                            </div>

                            <p>For security reasons, please change your password after logging in for the first time.</p>

                            <a href="%s" class="btn">Go to Login</a>
                        </div>

                        <div class="footer">
                            <p>© 2025 PeopleRecords | All Rights Reserved</p>
                            <p>This is an automated message. Please do not reply.</p>
                        </div>
                    </div>
                </body>
                </html>
                """;

            String loginUrl = "http://localhost:4200/login";

            String htmlContent = String.format(htmlTemplate, to, password, loginUrl);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send account creation email", e);
        }
    }
}
