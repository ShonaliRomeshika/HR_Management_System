import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step = 1; // track current step

  companyData = {
    companyName: '',
    companyEmail: '',
    address: '',
    phoneNumber: ''
  };

  adminData = {
    superAdminUsername: '',
    superAdminEmail: '',
    password: ''
  };

  token: string | null = null;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Step 1 validation before moving to Step 2
  goToAdminForm(companyForm: any) {
    if (companyForm.valid) {
      this.step = 2;
    } else {
      this.error = 'Please fill all required company details correctly.';
      setTimeout(() => (this.error = null), 3000); // hide error after 3s
    }
  }

  // Step 2 submission
  onSubmit(adminForm: any) {
    if (adminForm.invalid) {
      this.error = 'Please fill all required admin details correctly.';
      setTimeout(() => (this.error = null), 3000);
      return;
    }

    const payload = {
      companyName: this.companyData.companyName,
      companyEmail: this.companyData.companyEmail,
      address: this.companyData.address,
      phoneNumber: this.companyData.phoneNumber,
      superAdminUsername: this.adminData.superAdminUsername,
      superAdminEmail: this.adminData.superAdminEmail,
      password: this.adminData.password
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.token = res.token;
        localStorage.setItem('token', res.token);
 this.snackBar.open('✅ Login successful!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success'] // custom success class
      });
        this.error = null;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Registration failed. Please try again.';
        console.error(err);
      }
    });
  }

  // Go back to Step 1
  goBack() {
    this.step = 1;
  }
}
