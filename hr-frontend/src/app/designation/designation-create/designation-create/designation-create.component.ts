import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Designation, DesignationService } from '../../designation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css']
})
export class DesignationCreateComponent implements OnInit {
  designationForm!: FormGroup;
  id?: string;

  constructor(
    private fb: FormBuilder,
    private service: DesignationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;

    this.designationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });

    if (this.id) {
      const token = localStorage.getItem('token')!;
      this.service.getById(this.id, token).subscribe(des => this.designationForm.patchValue(des));
    }
  }

save(): void {
  if (this.designationForm.invalid) {
    this.designationForm.markAllAsTouched();
    return;
  }

  const des: Designation = this.designationForm.value;
  const token = localStorage.getItem('token')!; 

  if (this.id) {
    this.service.update(this.id, des, token).subscribe({
      next: () => {
        this.snackBar.open('✅ Designation updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/designations']);
      },
      error: () => {
        this.snackBar.open('❌ Failed to update designation', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  } else {
    this.service.create(des, token).subscribe({
      next: () => {
        this.snackBar.open('✅ Designation created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/designations']);
      },
      error: () => {
        this.snackBar.open('❌ Failed to create designation', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}


  get f() {
    return this.designationForm.controls;
  }
}
