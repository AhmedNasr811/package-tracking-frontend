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

const routes: Routes = [
  // Authentication routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // Dashboard routes
  {
    path: 'super-admin-dashboard',
    component: SuperAdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'courier-dashboard',
    component: CourierDashboardComponent,
    canActivate: [CourierGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard], // Add a guard for users
  },

  // Order routes
  { path: 'create-order', component: CreateOrderComponent, canActivate: [UserGuard] },
  { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [UserGuard] },

  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route (Catch-all)
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
