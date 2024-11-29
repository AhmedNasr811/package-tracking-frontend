// src/app/user-dashboard/user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule], // Import ReactiveFormsModule
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],

})
export class UserDashboardComponent implements OnInit {
  orders: any[] = []; // Stores the user's orders
  loading: boolean = true; // Show loading indicator while fetching data
  errorMessage: string = ''; // Store error messages

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.apiService.getMyOrders().subscribe({
      next: (response: any[]) => {
        this.orders = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.errorMessage = 'Failed to fetch orders. Please try again later.';
        this.loading = false;
      },
    });
  }

  viewOrderDetails(orderId: number) {
    // Navigate to a detailed view or display a modal for order details
    this.router.navigate([`/order-details/${orderId}`]);
  }

  cancelOrder(orderId: number) {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.apiService.cancelOrder(orderId).subscribe({
        next: () => {
          alert('Order cancelled successfully.');
          this.fetchOrders(); // Refresh the orders list after cancellation
        },
        error: (error) => {
          console.error('Error cancelling order:', error);
          alert('Failed to cancel order. Please try again.');
        },
      });
    }
  }

  createNewOrder() {
    // Navigate to the create order page
    this.router.navigate(['/create-order']);
  }
}
