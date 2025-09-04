import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userLogIn } from '../../models/user';
import { user, userPermission } from '../../models/user';
import { URL } from '../../../enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class LogInService {
  urlApi = URL;
  constructor(
    private Http: HttpClient
  ) { }
  public closeSession(nameUser: string) {
    debugger
     this.urlApi = this.urlApi;
    let Controller = '';
    let Headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log("headers "+ Headers.get("Content-Type"));
    return this.Http.post(this.urlApi + Controller,{ nameUser: nameUser }, {
        headers: Headers,
        responseType: 'json'
    });
}

  public LogIn(user: userLogIn) {
    let Controller = 'enter'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + Controller, user,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public consultarUsers(): Observable<any[]> {
    debugger
    let controller = "User";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${URL}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }
  public CreateUser(User: user, Permissions: userPermission) {
    let Controller = 'User'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    debugger
    const userDataToSend = {
      User: User,
      Permissions: Permissions
    };
    return this.Http.post(this.urlApi + Controller, userDataToSend,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public UpdateUser(User: user, Permissions: userPermission) {
    let Controller = 'User'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    debugger
    const userDataToSend = {
      User: User,
      Permissions: Permissions
    };
    return this.Http.put(this.urlApi + Controller, userDataToSend,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

}
