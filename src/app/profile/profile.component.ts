import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Ensure FormsModule is imported
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: { username: string; email: string } = { username: '', email: '' };
  newEmail: string = '';
  newPassword: string = '';
  showEditEmail = false;
  showEditPassword = false;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    if (typeof window === 'undefined') {
      console.error('❌ localStorage is not available (Running on the server).');
      return;
    }

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!token || !username || !password) {
      console.warn('⚠️ Missing authentication details.');
      alert('Session expired. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    this.profileService.getProfile(username, password).subscribe({
      next: (data) => {
        if (data && data.username) {
          console.log('✅ Profile Loaded:', data);
          this.user = data;
        } else {
          console.warn('⚠️ Empty or invalid profile data received.');
          alert('Failed to load profile. Please try again.');
        }
      },
      error: (err) => {
        console.error('❌ Failed to load profile:', err);
        alert('Failed to load profile. Please try again.');
      }
    });
  }

  editEmail() {
    this.showEditEmail = true;
  }

  saveEmail() {
    this.profileService.updateEmail(this.newEmail).subscribe({
      next: () => {
        alert('Email updated successfully');
        this.loadProfile();
        this.showEditEmail = false;
      },
      error: () => alert('Failed to update email'),
    });
  }

  editPassword() {
    this.showEditPassword = true;
  }

  savePassword() {
    this.profileService.updatePassword(this.newPassword).subscribe({
      next: () => {
        alert('Password updated successfully');
        this.showEditPassword = false;
      },
      error: () => alert('Failed to update password'),
    });
  }

  // ✅ Add the missing logout function
  logout() {
    localStorage.removeItem('token'); // Remove the JWT token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
