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
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: () => alert('Failed to load profile'),
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
