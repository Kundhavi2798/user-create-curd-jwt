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
      this.profileService.getProfile().subscribe({
        next: (data) => {
          console.log('✅ Backend Response:', data);
          this.users = [data];
        },
        error: (err) => {
          console.error('❌ Failed to fetch users:', err);
          alert('Failed to load users');
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
