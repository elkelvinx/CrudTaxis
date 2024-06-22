// auth-View.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authView',
  template: `
    <div class="auth-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: 'app.component.css'
})
export class AuthViewComponent {
    
    constructor(private router: Router) { }
}

