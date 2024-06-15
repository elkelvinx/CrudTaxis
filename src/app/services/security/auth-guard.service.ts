import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './authService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const section = route.data['section'];
    if (this.authService.verifyPermission(section)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}