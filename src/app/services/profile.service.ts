import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }
  updateEmail(email: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-email`,
      { email },
      { headers: this.getHeaders() }
    );
  }

  updatePassword(password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-password`,
      { password },
      { headers: this.getHeaders() }
    );
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Retrieve username from localStorage

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'X-Username': username || '' // Add username in headers
    });
  }
}
