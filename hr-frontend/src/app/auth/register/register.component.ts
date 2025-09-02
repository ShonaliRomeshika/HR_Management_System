import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    companyName: '',
    companyEmail: '',
    address: '',
    phoneNumber: '',
    superAdminUsername: '',
    superAdminEmail: '',
    password: ''
  };

  token: string | null = null;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        this.token = res.token;
        localStorage.setItem('token', res.token); // save token
      },
      error: (err) => {
        this.error = 'Registration failed';
        console.error(err);
      }
    });
  }
}
