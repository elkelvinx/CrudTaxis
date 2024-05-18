import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
public user= new user();
logIn(){
  console.log(this.user);
}
constructor(private router: Router) { }
redirrecionar(){
  this.router.navigate(['/login']);
}
}
