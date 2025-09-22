import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  error: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLogin() {
  this.authService.login(this.loginData).subscribe({
    next: (res: any) => {   
      localStorage.setItem('token', res.token);

      this.snackBar.open('✅ Login successful!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success'] 
      });

      this.router.navigate(['/home']);
    },
    error: () => {
      this.snackBar.open('❌ Invalid email or password', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'] 
      });
    }
  });
}

}
