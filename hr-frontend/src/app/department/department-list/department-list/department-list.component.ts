import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department, DepartmentService } from '../../department.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})

export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];

  constructor(
    private service: DepartmentService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  addDepartment() {
    this.router.navigate(['/departments/create']);
  }

  updateDepartment(id: string) {
    this.router.navigate(['/departments/create', id]);
  }

 loadDepartments() {
  const token = localStorage.getItem('token')!; 
  this.service.getAll(token).subscribe(data => this.departments = data);
}

deleteDepartment(id: string, name?: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: { item: name || 'this department' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const token = localStorage.getItem('token')!;
      this.service.delete(id, token).subscribe(() => this.loadDepartments());
    }
  });
}

}


