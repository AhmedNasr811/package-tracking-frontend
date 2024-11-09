import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginForm: FormGroup; // Declare the form property

constructor(private http: HttpClient, private fb: FormBuilder, private apiService: ApiService) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
  });
}



  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Make the HTTP POST request to the backend
      this.http.post('http://localhost:8080/login', formData)
        .subscribe(
          response => {
            console.log('User logged in successfully:', response);
            // Handle successful login, e.g., redirect or show a success message
           this.router.navigate(['/create-order']);  // Navigates to the "orders" page

          },
          error => {
            console.error('Login error:', error);
            // Handle error, e.g., show an error message
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }



}
