import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id?: string;
  employeeCode: string;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  nic: string;
  maritalStatus?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  departmentId: string;
  designationId: string;
  employmentType: string;
  dateOfJoining?: string;
  salary?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    return token 
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }

  getAll(token?: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl, { headers: this.getHeaders(token) });
  }

  getById(id: string, token?: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }

  create(employee: Employee, token: string): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee, { headers: this.getHeaders(token) });
  }

  update(id: string, employee: Employee, token: string): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers: this.getHeaders(token) });
  }

  delete(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }
}
