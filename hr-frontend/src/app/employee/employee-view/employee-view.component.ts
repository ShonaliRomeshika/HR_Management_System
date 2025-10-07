import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee?: Employee;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token')!;

    if (id && token) {
      this.employeeService.getById(id, token).subscribe({
        next: (res: any) => {
          this.employee = res.data ? res.data : res;
          console.log('✅ Employee data fetched:', this.employee);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error fetching employee:', err);
          this.isLoading = false;
          if (err.status === 403) {
            this.errorMessage = 'Access Denied. Please log in again.';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          } else {
            this.errorMessage = 'Failed to fetch employee details.';
          }
        }
      });
    } else {
      console.error('⚠️ Token or ID missing');
      this.errorMessage = 'You are not authorized or the employee ID is missing.';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }
  }
}
