import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './security/authService.service';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ServicesDriversService {
  URL = APIBASEURL;
  Jwt: string | null = this.authService.getToken();
  
  constructor(
    private Http: HttpClient,
    private authService: AuthService
  ) { }

  public consultarDriverId(id: number) {
    //se crean las variables para poder recibir la info del servidor
    let controller = "Driver";
    let params = new HttpParams().set("id", id);
    let Headers = new HttpHeaders().set("Authorization", `${this.Jwt}`).set("Accept", "aplication/json");
    //estos son los parametros del get que se envian al servidor
    //esta la URL de la api, ademas que su headers,parametros y el tipo de respuesta
    return this.Http.get(
       this.URL + controller,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    )
  }

  public consultarDrivers(): Observable<any[]> { 
    let controller = "Driver";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.URL}${encodeURIComponent(controller)}`,
      // `${this.urlApi}}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }

  public Grabar(Entidad: any) {

    let Controller = 'Driver'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.URL + Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public Actualizar(Entidad: any) {
    let Controller = 'Driver'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.put(this.URL + Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

  public Eliminar(id: any) {
    let Controller = 'Driver'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    let Params = new HttpParams().set('id', id);
    return this.Http.delete(this.URL + Controller,
      {
        headers: Headers,
        params: Params,
        responseType: 'json'
      }
    )
  }
  public ReducirContadorTabla(Entidad: any) {
    let Controller = 'Driver'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.URL + Controller + '/ReducirContador', null,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
}
