import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  adminLoginForm: FormGroup; // Declare the form property

  constructor(private http: HttpClient, private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    // Initialize the form in the constructor
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onAdminLogin() {
    if (this.adminLoginForm.valid) {
      const formData = this.adminLoginForm.value;

      // Make the HTTP POST request to the backend
      this.http.post('http://localhost:8080/admin/login', formData)
        .subscribe(
          (response: any) => {
            console.log('Admin logged in successfully:', response);
            const token: string = response.token;
            window.localStorage.setItem('admin-token', token);
            window.localStorage.setItem('adminid', response.admin.id);
            // Handle successful login, e.g., redirect or show a success message
            this.router.navigate(['/admin-dashboard']); // Navigate to the admin dashboard
          },
          error => {
            console.error('Admin login error:', error);
            // Handle error, e.g., show an error message
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
