import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userLogIn } from '../../models/user';
import { user,userPermission } from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class LogInService {
  urlApi = "https://localhost:44319/Api/";
  constructor(
    private Http: HttpClient
  ) { }
  public LogIn(user: userLogIn) {
    this.urlApi = "https://localhost:44319/Api/login/";
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
    debugger;
    let controller = "user";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }
  public CreateUser(User: user,Permissions: userPermission) {
    let Controller = 'logIn'
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
  public UpdateUser(User: user,Permissions: userPermission) {
    let Controller = 'logIn'
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
