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
    const params = new HttpParams()
        .set('username', username)
        .set('password', password);
    console.log("params", params)

    return this.http.get(`${this.apiUrl}/profile`, {
      params,
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
    console.log('token', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      // 'Accept': 'application/json, text/plain, */*'
    });
  }
}
