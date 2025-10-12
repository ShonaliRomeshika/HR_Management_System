import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userData = {
    name: '',
    email: ''
  };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.userData.name || !this.userData.email) {
      this.snackBar.open('⚠️ Please fill in all fields', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.userService.addUser(this.userData).subscribe({
      next: (res) => {
        this.snackBar.open('✅ User added successfully! Password sent via email.', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/users']); // redirect to user list
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('❌ Error adding user', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
