import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userLogIn } from '../models/user';
import { EncriptarDataService } from './encriptar-data.service';
@Injectable({
  providedIn: 'root'
})
export class LogInService {
  urlApi = "https://localhost:44319/Api/login/";
  constructor(
    private Http: HttpClient
  ) { }
  public LogIn(user: userLogIn) {
//  encriptarUser(user);
    let Controller = 'enter'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + Controller, user,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public CreateUser(){
    //necesito modificar el log In
  }
}
