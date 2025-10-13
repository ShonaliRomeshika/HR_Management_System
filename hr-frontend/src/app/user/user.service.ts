import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; 

  constructor(private http: HttpClient) {}

  addUser(data: { name: string; email: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId'); 

    if (!token) {
      return throwError(() => new Error('Authorization token not found in localStorage'));
    }
    if (!currentUserId) {
      return throwError(() => new Error('User ID not found in localStorage'));
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('X-User-Id', currentUserId);

    console.log('Sending headers:', headers.keys(), headers.get('X-User-Id'));

    return this.http.post<any>(`${this.apiUrl}/add`, data, { headers });
  }

  getUsers(): Observable<any> {
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId'); 

  if (!token) {
    return throwError(() => new Error('Authorization token not found in localStorage'));
  }
  if (!currentUserId) {
    return throwError(() => new Error('User ID not found in localStorage'));
  }

  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('X-User-Id', currentUserId);

  return this.http.get<any>(this.apiUrl, { headers });
}

deleteUser(userId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');

  if (!token || !currentUserId)
    return throwError(() => new Error('Auth details missing'));

  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('X-User-Id', currentUserId);

  return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
}

}
