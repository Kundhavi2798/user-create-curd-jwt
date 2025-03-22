import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface ProfileResponse {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  // ✅ Register User
  register(user: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // ✅ Login User
  login(user: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // ✅ Get Profile
  getProfile(): Observable<ProfileResponse> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Send token for authentication
      }),
    });
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('token'); // Remove token from storage
  }
}
