// src/app/super-admin/super-admin-dashboard.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SuperAdminDashboardComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  createAdmin() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    const adminData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.apiService.createAdmin(adminData).subscribe({
      next: () => {
        alert('Admin created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Failed to create admin:', error);
        alert('Failed to create admin. Please try again.');
      },
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}
