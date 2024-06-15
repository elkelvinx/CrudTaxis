import { Component } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { AuthService } from '../../../services/security/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedOption: string = 'home';
  isMenuOpen = false;
  menuWidth = '70px'; // Ancho inicial
  headerWidth = '3.7%'; // Ancho inicial
  iconButtonWidth = '70px'; 
  constructor(private router: Router,private auth:AuthService) { }

  isActive(path: string): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith(path);
  }
logOut(){
this.auth.logout();
}
closeSession(){
  debugger
  this.auth.logout();
  this.router.navigate(['/login']);
}

  toggleMenu() {
    debugger
    if (this.isMenuOpen) {
      this.closeMenu();
    }
    else {
    this.menuWidth = '270px'; // Cambia el ancho al hacer clic
    this.headerWidth = '270px'
    this.isMenuOpen = true;
    }
  }
  closeMenu() {
    this.menuWidth = '70px'; // Cambia el ancho al hacer clic
    this.headerWidth = '3.7%'
    this.isMenuOpen = false;
  }

}
