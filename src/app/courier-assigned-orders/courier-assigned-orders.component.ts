import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-courier-assigned-orders',
  standalone: true,

  imports: [CommonModule], // Include CommonModule here

  templateUrl: './courier-assigned-orders.component.html',
  styleUrls: ['./courier-assigned-orders.component.css']
})
export class CourierAssignedOrdersComponent implements OnInit {

  courierId: number=1; // Define this property

  assignedOrders: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchAssignedOrders();
  }

  fetchAssignedOrders(): void {
    this.apiService.getAssignedOrders(this.courierId).subscribe({
      next: (response: any[]) => {
        this.assignedOrders = response;
        console.log('Fetched assigned orders:', this.assignedOrders);
      },
      error: error => {
        console.error('Error fetching assigned orders:', error);
        alert('Failed to fetch assigned orders.');
      }
    });
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.apiService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        alert(`Order ${orderId} marked as ${status}.`);
        this.fetchAssignedOrders(); // Refresh the assigned orders list
      },
      error: (error) => {
        console.error(`Failed to update order ${orderId} status:`, error);
      },
    });
  }
  onAccept(orderId: string) {
    // Logic to accept the order (implement the API call if necessary)
    alert(`Order ${orderId} accepted.`);
  }

  onDecline(orderId: string) {
    // Logic to decline the order (implement the API call if necessary)
    alert(`Order ${orderId} declined.`);
  }
}


