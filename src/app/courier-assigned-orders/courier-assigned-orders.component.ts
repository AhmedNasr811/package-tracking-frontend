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

  assignedOrders: any[] = [];
  statuses: string[] = ['picked up', 'in transit', 'delivered']; // Status options

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchAssignedOrders();
  }

  fetchAssignedOrders(): void {
    this.apiService.getAssignedOrders().subscribe({
      next: (orders) => {
        this.assignedOrders = orders || []; // Fallback to an empty array
        console.log('Assigned orders:', orders);
      },
      error: (error) => {
        this.assignedOrders = []; // Handle error by resetting assignedOrders
        console.error('Failed to fetch assigned orders:', error);
        alert('Failed to fetch assigned orders. Please try again.');
      },
    });
  }


  updateOrderStatus(orderId: number, event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast EventTarget to HTMLSelectElement
    if (target && target.value) { // Ensure target and value exist
      const status = target.value;
      this.apiService.updateOrderStatus(orderId, status).subscribe({
        next: () => {
          alert('Order status updated successfully.');
          this.fetchAssignedOrders(); // Refresh the list
        },
        error: (error) => {
          console.error('Failed to update order status:', error);
          alert('Failed to update order status.');
        },
      });
    } else {
      console.error('Invalid status update event');
    }
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


