import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Backend URL

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }



 // Create Order
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

  // Fetch Orders for the logged-in user
  getMyOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/orders`);
  }

  // Get details of a specific order
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${orderId}`);
  }

  // Cancel an order (if pending)
  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/cancel`, {});
  }

  // Fetch orders assigned to a specific courier
  getAssignedOrders(courierId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/couriers/${courierId}/orders`);
  }

  // Update the status of an order
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, { status });
  }

  // Admin: Fetch all orders
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/orders`);
  }

  // Admin: Assign an order to a courier
  assignOrderToCourier(orderId: number, courierId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/assign`, { courierId });
  }

  // Admin: Update order details (e.g., change status, reassign courier)
  updateOrder(orderId: number, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/update`, updateData);
  }

  // Admin: Delete an order
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}`);
  }



}
