import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.snackBar.open('You have been logged out.', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
    this.router.navigate(['/login']);
  }
}
