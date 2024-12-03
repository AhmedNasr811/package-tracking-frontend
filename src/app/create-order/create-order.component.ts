import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  createOrderForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.createOrderForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
      packageDetails: ['', Validators.required],
      deliveryTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createOrderForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = this.createOrderForm.value;
    // Debug: Log form data
    console.log('Form Data:', formData);

    // Check if deliveryTime is populated
    if (!formData.deliveryTime) {
      alert('Delivery Time is required.');
      return;
    }

    // Convert delivery_time to ISO string
    formData.deliveryTime = new Date(formData.deliveryTime).toISOString();

    this.apiService.createOrder(formData).subscribe({
      next: response => {
        console.log('Order created successfully:', response);
        alert('Order created successfully!');
        this.router.navigate(['/user-dashboard']); // Redirect to the dashboard or another relevant page
      },
      error: error => {
        console.error('Error creating order:', error);
        alert('Failed to create order.');
      }
    });
  }

  onCancel() {
    this.createOrderForm.reset();
    alert('Order creation cancelled.');
    this.router.navigate(['/user-dashboard']); // Redirect to the dashboard or another relevant page

  }
}
