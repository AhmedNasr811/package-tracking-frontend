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
  couriers: any[] = [];
  statuses: string[] = ['pending', 'in progress', 'completed', 'cancelled'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchCouriers();
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

  fetchCouriers(): void {
    this.apiService.getAllCouriers().subscribe({
      next: (couriers) => {
        this.couriers = couriers || []; // Ensure it's an array or fallback to empty array
      },
      error: (error) => {
        console.error('Failed to fetch couriers:', error);
        alert('Failed to fetch couriers.');
      },
    });
  }
  

  getCourierName(courierId: number): string {
    //alert(this.couriers.at(0))
    const courier = this.couriers.find(c => c.id === courierId);
    return courier ? courier.name : 'No Courier Assigned';
  }

  assignOrder(orderId: number, event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast EventTarget to HTMLSelectElement
    const courierId = target.value; // Get the value of the selected option
  
    // Call the API to assign the order to the selected courier
    this.apiService.assignOrderToCourier(orderId, Number(courierId)).subscribe({
      next: () => {
        alert('Order is assigned successfully.');
        this.fetchOrders(); // Refresh the orders
      },
      error: (error: any) => {
        console.error('Failed to assign order:', error);
        alert('Failed to assign order. Please try again later.');
      },
    });
  }

  
}
