import { Component } from '@angular/core';
import { user, userLogIn } from '../../../models/user';
import { Router } from '@angular/router';
import { NotificationService } from '../../tools/info-dialog/notification.service';
import { LogInService } from '../../../services/log-in.service';
import { userResponse } from '../../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
public user= new user();
public JWT= new userResponse();
public errorMensaje: string= 'Informacion necesaria';
public errorMensaje2: string= 'No se permiten valores extraños';
constructor(private router: Router,private notificationService: NotificationService, private logInservice:LogInService) { }
logIn(){
  this.grabar(this.user);

}

redirrecionar(){
  this.router.navigate(['/login']);
}
public grabar(user: user) {
 let userAuth= new userLogIn();
 debugger
  userAuth = user;
  this.logInservice.LogIn(userAuth).subscribe(
    (data: any) => {
      debugger
      this.JWT.token  = data.Token;
      this.JWT.ErrorMessage = data.ErrorMessage;
      this.notificationService.success("El Conductor ha sido guardado la info es esta "+ this.JWT.token + data);
      debugger
      if(this.JWT.IsSuccess){
        debugger
        this.router.navigate(['/home']);
        this.notificationService.alert(this.user.name+" y su contraseña es: "+ this.user.password, 'Datos de el LogIn y el jwt'+ this.JWT.token, () => {
          this.notificationService.success("Lo notificare!");
      });
      }
    },
    error => {
      debugger
     // const errorMessage = error.error.ExceptionMessage || error.Message|| "Error desconocido"; // Accede al mensaje de error
      this.notificationService.displayMessageError("Error interno al Logearse"," "+error.error);
    }
  )
}
}
