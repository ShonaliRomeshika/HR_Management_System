import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentService } from '../../department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  departmentForm!: FormGroup;
    id?: string;
  
    constructor(
      private fb: FormBuilder,
      private service: DepartmentService,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id') || undefined;
  
      this.departmentForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
      });
  
      if (this.id) {
        const token = localStorage.getItem('token')!;
        this.service.getById(this.id, token).subscribe(des => this.departmentForm.patchValue(des));
      }
    }
  
  save(): void {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }
  
    const dep: Department = this.departmentForm.value;
    const token = localStorage.getItem('token')!; 
  
    if (this.id) {
      this.service.update(this.id, dep, token).subscribe({
        next: () => {
          this.snackBar.open('✅ Department updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/departments']);
        },
        error: () => {
          this.snackBar.open('❌ Failed to update department', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.service.create(dep, token).subscribe({
        next: () => {
          this.snackBar.open('✅ Department created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/departments']);
        },
        error: () => {
          this.snackBar.open('❌ Failed to create department', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
  
  
    get f() {
      return this.departmentForm.controls;
    }

}
