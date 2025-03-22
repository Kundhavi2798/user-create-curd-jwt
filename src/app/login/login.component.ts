import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule], // ✅ Include FormsModule in imports array
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('🔍 Before API Call:', this.user);

    if (!this.user.username || !this.user.password) {
      console.error('❌ Username or password is empty!');
      alert('Please enter both username and password.');
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('✅ Login successful:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.user.username);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('❌ Invalid username or password')
    });
  }
}
