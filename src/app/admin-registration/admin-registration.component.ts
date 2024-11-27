import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent {
  adminRegistrationForm: FormGroup; // Declare the form property

  constructor(private http: HttpClient, private fb: FormBuilder, private apiService: ApiService) {
    // Initialize the form in the constructor
    this.adminRegistrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const formData = this.adminRegistrationForm.value;
    this.http.post('http://localhost:8080/admin/register', formData)
      .subscribe(
        response => {
          console.log('Admin registered successfully:', response);
          // Handle successful registration, e.g., redirect or show a success message
        },
        error => {
          console.error('Admin registration error:', error);
          // Handle error, e.g., show an error message
        }
      );
  }
}
