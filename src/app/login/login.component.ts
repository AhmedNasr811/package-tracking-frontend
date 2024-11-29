// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiService } from '../api.service'; // Adjust path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Declare as standalone
  imports: [FormsModule], // Import FormsModule
})
export class LoginComponent {
  email: string = ''; // Declare properties
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    const loginData = { email: this.email, password: this.password };

    this.apiService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        // Redirect based on role
        switch (response.role) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'courier':
            this.router.navigate(['/courier-dashboard']);
            break;
          case 'user':
            this.router.navigate(['/user-dashboard']);
            break;
          default:
            alert('Role not recognized. Access denied.');
            break;
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      },
    });
  }
}
