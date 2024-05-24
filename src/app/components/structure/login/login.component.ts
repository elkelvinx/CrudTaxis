import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { Router } from '@angular/router';
import { NotificationService } from '../../tools/info-dialog/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
public user= new user();
// public notificationService: NotificationService;
constructor(private router: Router,private notificationService: NotificationService) { }
logIn(){
    this.notificationService.alert(this.user.name+" y su contraseña es: "+ this.user.password, 'Datos de el LogIn', () => {
      this.notificationService.success("Lo notificare!");
  });
}

redirrecionar(){
  this.router.navigate(['/login']);
}
}
