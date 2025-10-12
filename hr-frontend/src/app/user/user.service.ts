// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:8080/api/users'; 

//   constructor(private http: HttpClient) {}

// //   addUser(data: any): Observable<any> {
// //     const token = localStorage.getItem('token');
// //     const headers = new HttpHeaders({
// //       'Authorization': `Bearer ${token}`
// //     });

// //     return this.http.post<any>(`${this.apiUrl}/add`, data, { headers });
// //   }
// addUser(data: any): Observable<any> {
//   const token = localStorage.getItem('token');
//   const currentUserId = localStorage.getItem('userId'); // 👈 get this when user logs in

//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'X-User-Id': currentUserId || '' // 👈 add this header
//   });

//   return this.http.post<any>(`${this.apiUrl}/add`, data, { headers });
// }
// }

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
    const currentUserId = localStorage.getItem('userId'); // get this when user logs in

    // Check for missing token or userId
    if (!token) {
      return throwError(() => new Error('Authorization token not found in localStorage'));
    }
    if (!currentUserId) {
      return throwError(() => new Error('User ID not found in localStorage'));
    }
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('userId'));
    // Set headers
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('X-User-Id', currentUserId);

    // Optional: debug log
    console.log('Sending headers:', headers.keys(), headers.get('X-User-Id'));

    // Make POST request
    return this.http.post<any>(`${this.apiUrl}/add`, data, { headers });
  }
}
