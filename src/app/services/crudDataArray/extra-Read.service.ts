//en app service tendre todos los metodos de peticiones que necesite hacer al inicio del programa

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ReadService {
  urlApi = "https://localhost:44319/Api/";

  constructor(private Http: HttpClient) { }
//service para consultas en general cambiar nombre


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
  public consultarStreets(): Observable<any[]> {
    //se crean las variables para poder recibir la info del servidor
    let controller = "Street";
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
  public consultarAdminsName(): Observable<any[]> {
    let id: string = "adminName";
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
  public consultarDriverName(): Observable<any[]> {
    let id: string = "driverName";
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
  public consultarInsuranceName(): Observable<any[]> {
    let id: string = "insuranceName";
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
  public consultarTypeSinister(): Observable<any[]> {
    let id: string = "sinisterType";
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
  public consultarStatus(): Observable<any[]> {
    let id: string = "status";
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
    let id: string = "modelCar";
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
    let id: string = "brandCar";
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
  public consultarRelations(): Observable<any[]> {
    let id: string = "relationShip";
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
