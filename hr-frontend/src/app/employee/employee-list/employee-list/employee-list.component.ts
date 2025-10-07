import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { Employee, EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private service: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const token = localStorage.getItem('token')!;
    this.service.getAll(token).subscribe(res => (this.employees = res));
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employee/view', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees/update', id]);
  }

  deleteEmployee(id: string, name?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { item: name || 'this employee' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const token = localStorage.getItem('token')!;
        this.service.delete(id, token).subscribe(() => this.loadEmployees());
      }
    });
  }
}
