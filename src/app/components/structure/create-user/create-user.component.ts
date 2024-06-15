import { Component } from '@angular/core';
import { user, userLogIn } from '../../../models/user';
import { Router } from '@angular/router';
import { NotificationService } from '../../tools/info-dialog/notification.service';
import { LogInService } from '../../../services/security/log-in.service';
import { userResponse } from '../../../models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  public user= new user();
  public errorMensaje: string= 'Informacion necesaria';
  public errorMensaje2: string= 'No se permiten valores extraños';
  constructor(private router: Router,private notificationService: NotificationService, private logInservice:LogInService) { }
  createUser(){
    

  }
}
