import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Designation, DesignationService } from '../../designation.service';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;

    // ✅ Add validation rules that match your template
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
    const token = localStorage.getItem('token')!; // get JWT token from storage

    if (this.id) {
      this.service.update(this.id, des, token)
        .subscribe(() => this.router.navigate(['/designations']));
    } else {
      this.service.create(des, token)
        .subscribe(() => this.router.navigate(['/designations']));
    }
  }

  // ✅ Getter for form controls (used in HTML template)
  get f() {
    return this.designationForm.controls;
  }
}
