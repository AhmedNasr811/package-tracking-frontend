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

export const routes: Routes = [
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
      { path: 'my-orders', component: ManageOrdersComponent },
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
