

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  role: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Backend URL

  isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {
      this.isAuthenticated = this.authService.isLoggedIn();
  }
   // Register a new user
   register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login a user
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  createAdmin(adminData: any): Observable<any> {
    const token = this.getToken();
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.post(`${this.apiUrl}/create-admin`, adminData);
  }
  getPendingAdmins(): Observable<any[]> {
    const token = this.getToken();
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/pending-admins`);
  }

  // // User Registration
  // registerUser(userData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, userData);
  // }

  // // User Login
  // loginUser(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

    // Utility function to get the token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Create Order
  createOrder(orderData: any): Observable<any> {
    const token = this.getToken();
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.post(`${this.apiUrl}/create-order`, orderData,{ headers });
  }

  // Fetch Orders for the logged-in user
  getMyOrders(): Observable<any[]> {
    const token = this.getToken();
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`, { headers });
  }

  // Get details of a specific order
  getOrderDetails(orderId: number): Observable<any> {
    const token = this.getToken();
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.get<any>(`${this.apiUrl}/order-details/${orderId}`,{headers});
  }

  // Cancel an order (if pending)
  cancelOrder(orderId: number): Observable<any> {
    const token = this.getToken();
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.put(`${this.apiUrl}/cancel-order/${orderId}`,{},  {headers});
  }

  
  // Fetch orders assigned to a specific courier
  getAssignedOrders(): Observable<any[]> {
    const token = this.getToken();
    console.log('Token:', token); // Debug the token
    const headers = token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`) // Ensure "Bearer " is included
    : new HttpHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/courier/assigned-orders`, { headers });
  }
  


  getAllOrders(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.get<any[]>(`${this.apiUrl}/admin/list-orders`, { headers });
  }
  
  updateOrder(orderId: number, status: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.put(`${this.apiUrl}/admin/orders/update-status/${orderId}`, { status }, { headers });
  }
  
  deleteOrder(orderId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.delete(`${this.apiUrl}/admin/delete-order/${orderId}`, { headers });
  }

  // Admin: Assign an order to a courier
  assignOrderToCourier(orderId: number, courierId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.put(`${this.apiUrl}/admin/assign-order-to-courier/${orderId}`, {courier_id: courierId}, { headers });
  }
  

  getAllCouriers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
     return this.http.get<any[]>(`${this.apiUrl}/admin/list-couriers`, { headers });
  }

  getPendingOrders(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.get<any[]>(`${this.apiUrl}/courier/pending-orders`, { headers });
  }
  
  acceptOrder(orderId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.put(`${this.apiUrl}/courier/accept-order/${orderId}`, {}, { headers });
  }
  
  declineOrder(orderId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.put(`${this.apiUrl}/courier/decline-order/${orderId}`, {}, { headers });
  }
  
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  
    return this.http.put(`${this.apiUrl}/courier/update-status/${orderId}`, { status }, { headers });
  }
  


}