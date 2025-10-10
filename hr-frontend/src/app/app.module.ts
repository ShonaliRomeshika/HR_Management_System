import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home/home.component';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DesignationListComponent } from './designation/designation-list/designation-list/designation-list.component';
import { DesignationCreateComponent } from './designation/designation-create/designation-create/designation-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DepartmentCreateComponent } from './department/department-create/department-create/department-create.component';
import { DepartmentListComponent } from './department/department-list/department-list/department-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { NavbarComponent } from './shared/nav-bar/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DesignationListComponent,
    DesignationCreateComponent,
    ConfirmDialogComponent,
    DepartmentCreateComponent,
    DepartmentListComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    EmployeeViewComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
