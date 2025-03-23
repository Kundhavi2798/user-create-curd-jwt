import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import {NgForOf} from '@angular/common';
import {log} from 'util';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;  // ✅ Fix missing selectedUser
  newPassword: string = '';  // ✅ Fix missing newPassword

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!token) {
      console.error('❌ No authentication token');
      alert('Please log in again.');
      return;
    }

    if (!username || !password) {
      console.error('❌ Username or password missing in localStorage');
      alert('Please log in again.');
      return;
    }

    this.profileService.getProfile(username, password).subscribe({
      next: (data) => {
        console.log('✅ Backend Response:', data);
        this.users = Array.isArray(data) ? data : [data]; // Ensure array format
      },
      error: (err) => {
        console.error('❌ Failed to fetch users:', err);
        alert('Failed to load users. Please try again.');
      }
    });
  }

  updateEmail(user: any) {
    if (!user.updatedEmail) {
      alert("Please enter a new email before updating.");
      return;
    }

    this.profileService.updateEmail(user.updatedEmail).subscribe({
      next: () => {
        alert('✅ Email updated successfully!');
        user.updatedEmail = ''; // Clear input field
        this.loadUsers(); // Refresh user data
      },
      error: (error) => {
        console.error('❌ Error updating email:', error);
        alert('Failed to update email.');
      }
    });
  }

  updatePassword(user: any) {
    if (!user.updatedPassword) {
      alert("Please enter a new password before updating.");
      return;
    }

    this.profileService.updatePassword(user.updatedPassword).subscribe({
      next: () => {
        alert('✅ Password updated successfully!');
        user.updatedPassword = ''; // Clear input field
      },
      error: (error) => {
        console.error('❌ Error updating password:', error);
        alert('Failed to update password.');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
