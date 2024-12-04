

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { RegistrationComponent } from './registration/registration.component';
// import { LoginComponent } from './login/login.component';

// import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
// import { AdminLoginComponent } from './admin-login/admin-login.component';

// import { CreateOrderComponent } from './create-order/create-order.component';
// import { MyOrdersComponent } from './my-orders/my-orders.component';
// import { OrderDetailsComponent } from './order-details/order-details.component';
// import { CourierAssignedOrdersComponent } from './courier-assigned-orders/courier-assigned-orders.component';
// import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
// import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
// import { AssignCourierComponent } from './assign-courier/assign-courier.component';
// import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { CourierDashboardComponent } from './courier-dashboard/courier-dashboard.component';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { AdminGuard } from './gurads/admin.guard';


// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegistrationComponent },

//   { path: 'my-orders', component: MyOrdersComponent },  // Define route for the orders page
//   { path: 'create-order', component: CreateOrderComponent },  // Define route for creating an order

//   { path: 'order-details/:id', component: OrderDetailsComponent },  // Order Details page with dynamic ID


//   { path: 'admin/register', component: AdminRegistrationComponent },
//   { path: 'admin/login', component: AdminLoginComponent },
  
//   { path: 'courier/assigned-orders', component: CourierAssignedOrdersComponent },  // Assigned Orders for Couriers
//   { path: 'courier/update-order-status/:id', component: UpdateOrderStatusComponent },  // Update Order Status page
  
//   { path: 'admin/list-orders', component: AdminDashboardComponent },  // Admin Manage Orders page
//   { path: 'admin/orders/update-status/:id', component: AdminDashboardComponent },  // Admin Manage Orders page


//   { path: 'manage-orders', component: ManageOrdersComponent },  // Admin Manage Orders page
//   { path: 'assign-courier', component: AssignCourierComponent },  // Assign Courier page

//   { path: 'user-dashboard', component: UserDashboardComponent },
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', redirectTo: '/login' },

//   { path: 'courier-dashboard', component: CourierDashboardComponent},
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', redirectTo: '/login' },


//   { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] }, // Ensure this route exists
//   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login as default
//   { path: '**', redirectTo: '/login' }, // Fallback route


  

//   //{ path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on empty path
//   //{ path: '**', redirectTo: '/login' } // Wildcard route to handle unknown paths
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourierDashboardComponent } from './courier-dashboard/courier-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CourierAssignedOrdersComponent } from './courier-assigned-orders/courier-assigned-orders.component';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AssignCourierComponent } from './assign-courier/assign-courier.component';

// Guards
import { AdminGuard } from './gurads/admin.guard';
import { CourierGuard } from './gurads/courier.guard';
import { UserGuard } from './gurads/user.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
  // Authentication Routes

  { path: 'my-orders', component: MyOrdersComponent },  // Define route for the orders page
  { path: 'create-order', component: CreateOrderComponent },  // Define route for creating an order

  { path: 'order-details/:id', component: OrderDetailsComponent },  // Order Details page with dynamic ID


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
      { path: 'my-orders', component: MyOrdersComponent },
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

