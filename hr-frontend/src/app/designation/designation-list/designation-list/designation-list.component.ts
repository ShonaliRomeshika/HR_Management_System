import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Designation, DesignationService } from '../../designation.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {
  designations: Designation[] = [];

  constructor(private service: DesignationService, private router: Router) {}

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
  const token = localStorage.getItem('token')!; // JWT token
  this.service.getAll(token).subscribe(data => this.designations = data);
}

deleteDesignation(id: string) {
  if (confirm('Are you sure you want to delete this designation?')) {
    const token = localStorage.getItem('token')!;
    this.service.delete(id, token).subscribe(() => this.loadDesignations());
  }
}

}
