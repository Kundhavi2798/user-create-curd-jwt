import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getProfile(username: string, password: string): Observable<any> {
    const payload = { username, password }; // ✅ Include username and password in the payload

    return this.http.request('GET', `${this.apiUrl}/profile`, {
      body: payload, // ✅ Workaround: Pass payload in request body (Angular allows this)
      headers: this.getHeaders(),
    });
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

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
  }
}
