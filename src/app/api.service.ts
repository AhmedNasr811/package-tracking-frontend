/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Backend URL

  constructor(private http: HttpClient) {}

  // User Registration
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // User Login
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

    // Utility function to get the token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Create Order
  createOrder(orderData: any): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    
    return this.http.post(`${this.apiUrl}/create-order`, orderData);
  }

  // Fetch Orders for the logged-in user
  getMyOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders?/${userId}`);
  }

  // Get details of a specific order
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order-details/${orderId}`);
  }

  // Cancel an order (if pending)
  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel-order/${orderId}`, {});
  }

  // Fetch orders assigned to a specific courier
  getAssignedOrders(courierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/couriers/${courierId}/orders`);
  }

  // Update the status of an order
  updateOrderStatus(orderId: number, statusUpdate: { status: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, statusUpdate);
  }

  // Admin: Fetch all orders
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/orders`);
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
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Backend URL

  constructor(private http: HttpClient) {}

  // User Registration
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // User Login
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

    // Utility function to get the token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Create Order
  createOrder(orderData: any): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `${token}`) : new HttpHeaders();
    return this.http.post(`${this.apiUrl}/create-order`, orderData,{ headers });
  }

  // Fetch Orders for the logged-in user
  getMyOrders(userId: number): Observable<any[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `${token}`) : new HttpHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/orders`,{ headers });
  }

  // Get details of a specific order
  getOrderDetails(orderId: number): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `${token}`) : new HttpHeaders();
    return this.http.get<any>(`${this.apiUrl}/order-details/${orderId}`,{headers});
  }

  // Cancel an order (if pending)
  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel-order/${orderId}`, {});
  }

  // Fetch orders assigned to a specific courier
  getAssignedOrders(courierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/couriers/${courierId}/orders`);
  }

  // Update the status of an order
  updateOrderStatus(orderId: number, statusUpdate: { status: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, statusUpdate);
  }

  // Admin: Fetch all orders
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/orders`);
  }

  // Admin: Assign an order to a courier
  assignOrderToCourier(orderId: number, courierId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/assign`, { courierId });
  }




   // Accept an order
   acceptOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/accept`, {});
  }

  // Decline an order
  declineOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/decline`, {});
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