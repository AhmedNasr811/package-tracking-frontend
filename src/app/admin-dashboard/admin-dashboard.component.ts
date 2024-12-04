import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule], // Import ReactiveFormsModule
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  orders: any[] = [];
  statuses: string[] = ['pending', 'in progress', 'completed', 'cancelled'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.apiService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Failed to fetch orders:', error);
        alert('Failed to fetch orders.');
      },
    });
  }

  updateOrderStatus(orderId: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const status = target.value;

    this.apiService.updateOrder(orderId, status).subscribe({
      next: () => {
        alert('Order status updated successfully.');
        this.fetchOrders(); // Refresh the orders
      },
      error: (error) => {
        console.error('Failed to update order status:', error);
        alert('Failed to update order status.');
      },
    });
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.apiService.deleteOrder(orderId).subscribe({
        next: () => {
          alert('Order deleted successfully.');
          this.fetchOrders(); // Refresh the orders
        },
        error: (error) => {
          console.error('Failed to delete order:', error);
          alert('Failed to delete order.');
        },
      });
    }
  }
}
