import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Designation {
  id?: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  private apiUrl = 'http://localhost:8080/api/designations';

  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    return token 
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }

  getAll(token?: string): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.apiUrl, { headers: this.getHeaders(token) });
  }

  getById(id: string, token?: string): Observable<Designation> {
    return this.http.get<Designation>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }

  create(designation: Designation, token: string): Observable<Designation> {
    return this.http.post<Designation>(this.apiUrl, designation, { headers: this.getHeaders(token) });
  }

  update(id: string, designation: Designation, token: string): Observable<Designation> {
    return this.http.put<Designation>(`${this.apiUrl}/${id}`, designation, { headers: this.getHeaders(token) });
  }

  delete(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }
}
