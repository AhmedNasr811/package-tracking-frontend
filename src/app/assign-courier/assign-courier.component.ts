/*import { Component } from '@angular/core';

@Component({
  selector: 'app-assign-courier',
  standalone: true,
  imports: [],
  templateUrl: './assign-courier.component.html',
  styleUrl: './assign-courier.component.css'
})
export class AssignCourierComponent {

}
*/

import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-assign-courier',
  standalone: true,
  imports: [HttpClientModule], // Ensure HttpClientModule is imported
  templateUrl: './assign-courier.component.html',
  styleUrls: ['./assign-courier.component.css'],
})
export class AssignCourierComponent implements OnInit {
  orders: any[] = []; // Holds the list of assigned orders
  courierId: number = 1; // Example: Replace with actual courier ID logic

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchAssignedOrders();
  }

  fetchAssignedOrders(): void {
    this.apiService.getAssignedOrders(this.courierId).subscribe({
      next: (response: any[]) => {
        this.orders = response;
      },
      error: (error) => {
        console.error('Failed to fetch orders:', error);
      },
    });
  }

  acceptOrder(orderId: number): void {
    this.apiService.acceptOrder(orderId).subscribe({
      next: () => {
        this.updateOrderStatus(orderId, 'Accepted');
      },
      error: (error) => {
        console.error('Failed to accept order:', error);
      },
    });
  }

  declineOrder(orderId: number): void {
    this.apiService.declineOrder(orderId).subscribe({
      next: () => {
        this.updateOrderStatus(orderId, 'Declined');
      },
      error: (error) => {
        console.error('Failed to decline order:', error);
      },
    });
  }

  updateOrderStatus(orderId: number, status: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
    }
  }
}
