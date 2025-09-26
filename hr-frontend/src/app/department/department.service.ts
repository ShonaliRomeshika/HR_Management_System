import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Department {
  id?: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/api/departments';

  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    return token 
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }

  getAll(token?: string): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl, { headers: this.getHeaders(token) });
  }

  getById(id: string, token?: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }

  create(Department: Department, token: string): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, Department, { headers: this.getHeaders(token) });
  }

  update(id: string, Department: Department, token: string): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, Department, { headers: this.getHeaders(token) });
  }

  delete(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }
}
