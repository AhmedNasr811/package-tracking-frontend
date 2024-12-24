// src/app/services/auth.service.ts

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
        return !!localStorage.getItem('authToken');
    }
    return false;
}

  // Get the user's role
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }
}
