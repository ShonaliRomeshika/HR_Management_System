import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
emp: any;
confirmDelete(_t26: Employee) {
throw new Error('Method not implemented.');
}
  employees: Employee[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  token: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve JWT token from localStorage (or AuthService if you have one)
    this.token = localStorage.getItem('token') || '';
    this.getEmployees();
  }

  getEmployees(): void {
    this.loading = true;
    this.employeeService.getAll(this.token).subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.errorMessage = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }

  addEmployee(): void {
    this.router.navigate(['/employees/create']);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id, this.token).subscribe({
        next: () => {
          this.getEmployees(); // refresh list after delete
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.errorMessage = 'Failed to delete employee.';
        }
      });
    }
  }
}
