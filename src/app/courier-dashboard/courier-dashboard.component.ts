import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courier-dashboard',
  standalone: true,
  imports: [CommonModule], // Import ReactiveFormsModule
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.css']
})
export class CourierDashboardComponent implements OnInit {
  pendingOrders: any[] = [];
  acceptedOrders: any[] = [];
  statuses: string[] = ['picked up', 'in transit', 'delivered'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPendingOrders();
    this.fetchAcceptedOrders();
  }

  fetchPendingOrders(): void {
    this.apiService.getPendingOrders().subscribe({
      next: (orders) => (this.pendingOrders = orders),
      error: (error) => console.error('Error fetching pending orders:', error),
    });
  }

  fetchAcceptedOrders(): void {
    // Simulate fetching accepted orders (modify backend to support this)
    this.acceptedOrders = this.pendingOrders.filter(
      (order) => order.status === 'accepted'
    );
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
    const target = event.target as HTMLSelectElement; // Cast EventTarget to HTMLSelectElement
    const status = target.value; // Access the value of the selected option
    this.apiService.updateOrderStatus(orderId, String(status)).subscribe({
      next: () => alert('Order status updated successfully.'),
      error: (error) => alert('Failed to update status: ' + error.message),
    });
  }
}