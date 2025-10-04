import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { DesignationCreateComponent } from './designation/designation-create/designation-create/designation-create.component';
import { DesignationListComponent } from './designation/designation-list/designation-list/designation-list.component';
import { DepartmentCreateComponent } from './department/department-create/department-create/department-create.component';
import { DepartmentListComponent } from './department/department-list/department-list/department-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list/employee-list.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'designations', component: DesignationListComponent },
  { path: 'designations/create', component: DesignationCreateComponent },
  { path: 'designations/update/:id', component: DesignationCreateComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/create', component: DepartmentCreateComponent },
  { path: 'departments/update/:id', component: DepartmentCreateComponent },

  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create', component: EmployeeCreateComponent },
  { path: 'employees/update/:id', component: EmployeeCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
