import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courier-dashboard',
  standalone: true,
  imports: [CommonModule], // Import ReactiveFormsModule
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.css']
})
export class CourierDashboardComponent implements OnInit {
  pendingOrders: any[] = [];  // Initialized as empty array
  acceptedOrders: any[] = [];  // Initialized as empty array
  allOrders: any[] = [];

  statuses: string[] = ['picked up', 'in transit', 'delivered'];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPendingOrders();
    this.fetchAcceptedOrders();
  }

  fetchPendingOrders(): void {
    this.apiService.getPendingOrders().subscribe({
      next: (orders) => (this.pendingOrders = orders || []),
      error: (error) => {
        console.error('Error fetching pending orders:', error);
        this.pendingOrders = [];  // Fallback in case of error
      },
    });
  }

  fetchAcceptedOrders(): void {
    this.apiService.getAssignedOrders().subscribe({
      next: (orders) => (this.acceptedOrders = orders || []),
      error: (error) => {
        console.error('Error fetching accepted orders:', error);
        this.acceptedOrders = [];  // Fallback in case of error
      },
    });
  }

  acceptOrder(orderId: number): void {
    this.apiService.acceptOrder(orderId).subscribe({
      next: () => {
        alert('Order accepted successfully.');
        this.fetchPendingOrders();
        this.fetchAcceptedOrders();
      },
      error: (error) => alert('Failed to accept order: ' + error.message),
    });
  }

  declineOrder(orderId: number): void {
    this.apiService.declineOrder(orderId).subscribe({
      next: () => {
        alert('Order declined successfully.');
        this.fetchPendingOrders();
      },
      error: (error) => alert('Failed to decline order: ' + error.message),
    });
  }

  updateOrderStatus(orderId: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const status = target.value;

    this.apiService.updateOrder(orderId, status).subscribe({
      next: () => {
        alert('Order status updated successfully.');
        this.fetchAcceptedOrders(); // Refresh the orders
      },
      error: (error) => {
        console.error('Failed to update order status:', error);
        alert('Failed to update order status.');
      },
    });
  }
}