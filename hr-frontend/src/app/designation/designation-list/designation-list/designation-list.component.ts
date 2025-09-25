import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Designation, DesignationService } from '../../designation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {
  designations: Designation[] = [];

  constructor(
    private service: DesignationService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDesignations();
  }

  addDesignation() {
    this.router.navigate(['/designations/create']);
  }

  updateDesignation(id: string) {
    this.router.navigate(['/designations/create', id]);
  }

 loadDesignations() {
  const token = localStorage.getItem('token')!; 
  this.service.getAll(token).subscribe(data => this.designations = data);
}

deleteDesignation(id: string, title?: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: { item: title || 'this designation' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const token = localStorage.getItem('token')!;
      this.service.delete(id, token).subscribe(() => this.loadDesignations());
    }
  });
}

}
