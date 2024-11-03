import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';  // Make sure you have ApiService created

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],  // Import necessary Angular modules
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']  // Note the correct plural for styleUrls
})
export class CreateOrderComponent {
  createOrderForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // Initialize the form with form controls and validators
    this.createOrderForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropOffLocation: ['', Validators.required],
      packageDetails: ['', Validators.required],
      deliveryTime: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.createOrderForm.valid) {
      // If form is valid, call the API service to create the order
      this.apiService.createOrder(this.createOrderForm.value).subscribe(
        response => {
          console.log('Order created successfully:', response);
        },
        error => {
          console.error('Error creating order:', error);
        }
      );
    }
  }
}
