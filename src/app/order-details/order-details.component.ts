import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';


import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-order-details',
  standalone: true,

  imports: [CommonModule], // Include CommonModule here

  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string | null = null;
  orderDetails: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.fetchOrderDetails();
  }

  fetchOrderDetails() {
    if (this.orderId) {
      this.apiService.getOrderDetails(Number(this.orderId)).subscribe({
        next: response => {
          this.orderDetails = response;
          console.log('Fetched order details:', this.orderDetails);
        },
        error: error => {
          console.error('Error fetching order details:', error);
          alert('Failed to fetch order details.');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/cancel-order',this.orderId]);
    alert('Order cancellation successful.');
    this.router.navigate(['/user-dashboard']);

  }
}
