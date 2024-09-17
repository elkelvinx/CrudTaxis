import { Component } from '@angular/core';
import { user, userLogIn } from '../../../models/user';
import { Router } from '@angular/router';
import { NotificationService } from '../../tools/info-dialog/notification.service';
import { LogInService } from '../../../services/security/log-in.service';
import { userResponse } from '../../../models/user';
import { AuthService } from '../../../services/security/authService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
public user= new userLogIn();
public JWT= new userResponse();
constructor(private router: Router,private notificationService: NotificationService, private logInservice:LogInService,private authService:AuthService) { }
logIn(){
  this.grabar(this.user);
}
redirrecionar(){
  this.router.navigate(['/home']);
}
public grabar(user: userLogIn) {
  debugger
  this.logInservice.LogIn(user).subscribe(
    (data: any) => {
      this.JWT = data;
      this.notificationService.success("Inicio de sesion exitoso");
      debugger
      if(this.JWT.IsSuccess){
        this.authService.setToken(this.JWT.Token);
        this.redirrecionar();
        this.notificationService.alert(this.user.name+" y su contraseña es: "+ this.user.password, 'Datos de el LogIn y el jwt', () => {
          this.notificationService.success("Lo notificare!");
      });
      }
    },
    error => {
      debugger
     // const errorMessage = error.error.ExceptionMessage || error.Message|| "Error desconocido"; // Accede al mensaje de error
      console.log(error);
      this.notificationService.displayMessageError("Error interno al Logearse"," "+error.error);
    }
  )
}
}
