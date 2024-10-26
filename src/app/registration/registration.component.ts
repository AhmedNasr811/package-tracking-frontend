import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
 registrationForm: FormGroup; // Declare the form property
constructor(private http: HttpClient, private fb: FormBuilder, private apiService: ApiService) {
    // Initialize the form in the constructor
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
  });
}



onSubmit() {
    const formData = this.registrationForm.value;
    this.http.post('http://localhost:8080/register', formData)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          // Handle successful registration, e.g., redirect or show a success message
        },
        error => {
          console.error('Registration error:', error);
          // Handle error, e.g., show an error message
        }
      );
  }


}
