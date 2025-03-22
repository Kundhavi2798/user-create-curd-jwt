import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import {NgForOf} from '@angular/common';
import {log} from 'util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    if (typeof window !== 'undefined' && localStorage) {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password'); // Ensure password is stored (if needed)

      if (!username || !password) {
        console.error('❌ Username or password not found in localStorage');
        alert('Please log in again.');
        return;
      }

      this.profileService.getProfile(username, password).subscribe({
        next: (data) => {
          console.log('✅ Backend Response:', data);
          if (data) {
            this.users = Array.isArray(data) ? data : [data]; // Ensure it's an array
          } else {
            console.warn('⚠️ Received empty response from backend');
          }
        },
        error: (err) => {
          console.error('❌ Failed to fetch users:', err);
          alert('Failed to load users. Please try again.');
        }
      });
    } else {
      console.error('❌ localStorage is not available');
    }
  }




  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
