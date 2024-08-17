import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './authService.service';
import { NotificationService } from '../../components/tools/info-dialog/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{
  constructor(private authService: AuthService, private router: Router,private notificationService: NotificationService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const section = route.data['section'];
    if (this.authService.verifyPermission(section)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notificationService.alert("necesita validar que es una persona que tiene permisos para entrar en la seccion "+ section, 'Inicie sesion porfavor');
      return false;
    }
  }
}