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
  public CreateUser(userData: user,userPerm: userPermission) {
    let Controller = 'user'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + Controller, [userData,userPerm],
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public Grabar(Entidad: any) {

    let Controller = 'Driver'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public consultarUsers(): Observable<any[]> {
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

}
