//en app service tendre todos los metodos de peticiones que necesite hacer al inicio del programa

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AppService {
  urlApi = "https://localhost:44319/Api/";

  constructor(private Http: HttpClient) { }

  //metodo para consultar todas las colonias
  public consultarSettlements(): Observable<any[]> {
    //se crean las variables para poder recibir la info del servidor
    let controller = "Settlement";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    //esta la URL de la api, ademas que su headers y el tipo de respuesta
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }


  public consultarAdmins(): Observable<any[]> {
    let controller = "Admin";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }


  public consultarSettlementName(id: string): Observable<any[]> {
    //se crean las variables para poder recibir la info del servidor
    let controller = "Settlement";
    let params = new HttpParams().set("val", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    //esta la URL de la api, ademas que su headers y el tipo de respuesta
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    );
  }
  public consultarStreetName(id: string): Observable<any[]> {
    //se crean las variables para poder recibir la info del servidor
    let controller = "Street";
    let params = new HttpParams().set("val", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    //esta la URL de la api, ademas que su headers y el tipo de respuesta
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    );
  }
  public consultarAdminName(id: string): Observable<any[]> {
    //se crean las variables para poder recibir la info del servidor
    let controller = "Admin";
    let params = new HttpParams().set("val", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    //esta la URL de la api, ademas que su headers y el tipo de respuesta
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    );
  }
  // esto es para units
  public consultarAdminsName(): Observable<any[]> {
    let id: number = 3;
    let controller = "DataArray";
    let params = new HttpParams().set("val", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    );
  }
  public consultarModelsName(): Observable<any[]> {
    let id: number = 2;
    let controller = "DataArray";
    let params = new HttpParams().set("val", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    );
  }
  public consultarBrandsName(): Observable<any[]> {
    let id: number = 1;
    let controller = "DataArray";
    let params = new HttpParams().set("val", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    );
  }
}
