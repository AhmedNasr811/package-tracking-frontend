import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,  CommonModule], // Import ReactiveFormsModule
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  roles: string[] = ['user', 'courier', 'admin']; // Add 'admin' to the role options

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.initializeForm();
  }

  private initializeForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', [Validators.required]], // Default role is 'user'
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      alert('Please correct the errors in the form.');
      return;
    }

    const registrationData = this.registrationForm.value;

    this.apiService.register(registrationData).subscribe({
      next: (response) => {
        if (registrationData.role === 'admin') {
          alert(
            'Registration submitted. Your account will be reviewed by a Super Admin.'
          );
        } else {
          alert('Registration successful! Please log in.');
        }
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        alert('Registration failed. Please try again.');
        console.error('Registration error:', error);
      },
    });
  }
}
