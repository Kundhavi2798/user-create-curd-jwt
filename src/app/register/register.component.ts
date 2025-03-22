import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // ✅ Add RouterModule
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

 onRegister() {
    console.log("🔍 Register button clicked!");

    // ✅ Check if form is valid
    if (this.registerForm.invalid) {
      console.log("❌ Form is invalid:", this.registerForm.value);
      this.errorMessage = '❌ Please fill all fields correctly!';
      return;
    }

    const { username, email, password, confirmPassword } = this.registerForm.value;

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match!");
      this.errorMessage = "❌ Passwords do not match!";
      return;
    }

    this.authService.register({ username, email, password, confirmPassword }).subscribe({
      next: () => {
        alert('🎉 Registration successful! Redirecting to login...');
        this.router.navigate(['/login']); // ✅ Redirect to login after success
      },
      error: (err) => {
        this.errorMessage = err.error?.message || '❌ Registration failed!';
      }
    });
  }
}
