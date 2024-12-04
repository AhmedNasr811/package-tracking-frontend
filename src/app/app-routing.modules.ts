// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourierDashboardComponent } from './courier-dashboard/courier-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { AdminGuard } from './gurads/admin.guard';
import { CourierGuard } from './gurads/courier.guard';
import { UserGuard } from './gurads/user.guard';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CourierAssignedOrdersComponent } from './courier-assigned-orders/courier-assigned-orders.component';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AssignCourierComponent } from './assign-courier/assign-courier.component';

// const routes: Routes = [
//   // Authentication routes
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegistrationComponent },

//   // Dashboard routes
//   {
//     path: 'super-admin-dashboard',
//     component: SuperAdminDashboardComponent,
//     canActivate: [AdminGuard],
//   },
//   {
//     path: 'admin-dashboard',
//     component: AdminDashboardComponent,
//     canActivate: [AdminGuard],
//   },
//   {
//     path: 'courier-dashboard',
//     component: CourierDashboardComponent,
//     canActivate: [CourierGuard],
//   },
//   {
//     path: 'user-dashboard',
//     component: UserDashboardComponent,
//     canActivate: [UserGuard], // Add a guard for users
//   },

//   // Order routes
//   { path: 'create-order', component: CreateOrderComponent, canActivate: [UserGuard] },
//   { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [UserGuard] },

//   { path: 'admin/orders/update-status/:id', component: AdminDashboardComponent, canActivate: [AdminGuard] },
//   { path: 'admin/list-orders', component: AdminDashboardComponent, canActivate: [AdminGuard] },


//   { path: 'courier/assigned-orders', component: CourierAssignedOrdersComponent, canActivate: [CourierGuard] },  // Assigned Orders for Couriers
//   { path: 'courier/update-order-status/:id', component: UpdateOrderStatusComponent,  canActivate: [CourierGuard] },  // Update Order Status page
  

//   // Default route
//   { path: '', redirectTo: '/login', pathMatch: 'full' },

//   // Wildcard route (Catch-all)
//   { path: '**', redirectTo: '/login' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}



const routes: Routes = [
  // Authentication Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // Super Admin Routes
  {
    path: 'super-admin-dashboard',
    component: SuperAdminDashboardComponent,
    canActivate: [AdminGuard],
  },

  // Admin Routes
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'list-orders', component: ManageOrdersComponent },
      { path: 'assign-courier', component: AssignCourierComponent },
    ],
  },

  // Courier Routes
  {
    path: 'courier-dashboard',
    component: CourierDashboardComponent,
    canActivate: [CourierGuard],
    children: [
      { path: 'assigned-orders', component: CourierAssignedOrdersComponent },
      { path: 'update-order-status/:id', component: UpdateOrderStatusComponent },
    ],
  },

  // User Routes
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      { path: 'create-order', component: CreateOrderComponent },
      //{ path: 'my-orders', component: ManageOrdersComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
    ],
  },

  // Default and Wildcard Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
