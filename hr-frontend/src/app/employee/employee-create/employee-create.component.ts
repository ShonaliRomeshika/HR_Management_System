import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../employee.service';
import { DepartmentService } from '../../department/department.service';
import { DesignationService } from '../../designation/designation.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm!: FormGroup;
  id?: string;
  departments: any[] = [];
  designations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;

    this.employeeForm = this.fb.group({
      employeeCode: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: [''],
      gender: [''],
      nic: ['', Validators.required],
      maritalStatus: [''],
      contactNumber: [''],
      email: ['', Validators.email],
      address: [''],
      departmentId: ['', Validators.required],
      designationId: ['', Validators.required],
      employmentType: [''],
      dateOfJoining: [''],
      salary: ['']
    });

    const token = localStorage.getItem('token')!;

    this.departmentService.getAll(token).subscribe(res => this.departments = res);
    this.designationService.getAll(token).subscribe(res => this.designations = res);

    if (this.id) {
      this.service.getById(this.id, token).subscribe(emp => {
        this.employeeForm.patchValue({
          ...emp,
          departmentId: emp.department?.id,
          designationId: emp.designation?.id
        });
      });
    }
  }

  save(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValue = this.employeeForm.value;
    const token = localStorage.getItem('token')!;

    // ✅ Convert departmentId and designationId to nested objects
    const employeePayload = {
      ...formValue,
      department: { id: formValue.departmentId },
      designation: { id: formValue.designationId }
    };

    // Optionally remove the raw IDs (not necessary but clean)
    delete (employeePayload as any).departmentId;
    delete (employeePayload as any).designationId;

    if (this.id) {
      this.service.update(this.id, employeePayload, token).subscribe({
        next: () => {
          this.snackBar.open('✅ Employee updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snackBar.open('❌ Failed to update employee', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.service.create(employeePayload, token).subscribe({
        next: () => {
          this.snackBar.open('✅ Employee created successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snackBar.open('❌ Failed to create employee', 'Close', { duration: 3000 });
        }
      });
    }
  }

  get f() {
    return this.employeeForm.controls;
  }
}
