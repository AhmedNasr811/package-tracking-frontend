import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
  imports: [NavbarComponent, RouterOutlet],

  // styles: [
  //   `
  //     .container {
  //       padding: 20px;
  //     }
  //   `,
  // ],
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'] // Note: it should be 'styleUrls' not 'styleUrl'
})
export class AppComponent {
  title = 'package-tracking-frontend';
}
