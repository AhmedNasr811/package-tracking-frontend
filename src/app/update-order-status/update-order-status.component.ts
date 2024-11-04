import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-order-status',
  standalone: true,
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.css']
})
export class UpdateOrderStatusComponent {
  orderId: string | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  onUpdateStatus(newStatus: string) {
    if (this.orderId) {
      this.apiService.updateOrderStatus(Number(this.orderId), { status: newStatus }).subscribe({
        next: response => {
          console.log('Order status updated successfully:', response);
          alert('Order status updated successfully!');
        },
        error: error => {
          console.error('Error updating order status:', error);
          alert('Failed to update order status.');
        }
      });
    }
  }
}
