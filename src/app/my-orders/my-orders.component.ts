import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'; // Import Router for navigation

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-orders',
  standalone: true,

  imports: [CommonModule], // Add this line

  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.apiService.getMyOrders().subscribe({
      next: (response: any[]) => {
        this.orders = response;
        console.log('Fetched orders:', this.orders);
      },
      error: error => {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders.');
      }
    });
  }

  onViewDetails(orderId: number) {
    // Navigate to the order details page using the order ID
    this.router.navigate(['/order-details', orderId]);
  }
}
