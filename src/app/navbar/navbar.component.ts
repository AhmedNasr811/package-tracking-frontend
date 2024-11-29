// src/app/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

// src/app/navbar/navbar.component.ts

import { CommonModule } from '@angular/common'; // Provides common directives like ngIf, ngFor, etc.
import { RouterModule } from '@angular/router';   // If using routerLink in the template

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true, // Declare as standalone
  imports: [CommonModule, RouterModule], // Import necessary modules
})

export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
