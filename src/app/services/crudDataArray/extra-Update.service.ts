import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../../enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ExtraUpdateService {

  urlApi = APIBASEURL;
  public Controller:string='DataArray'
  constructor(
    private Http: HttpClient
  ) { }
  public Eliminar(id: any) {
    let Controller = 'Unit'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    let Params = new HttpParams().set('id', id);
    return this.Http.delete(this.urlApi + Controller,
      {
        headers: Headers,
        params: Params,
        responseType: 'json'
      }
    )
  }
  //? RELATIONSHIP
  public Actualizar(metodo: string, entidad: any): Observable<any> {
    debugger
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params = new HttpParams().set('metodo', metodo); // Añade 'metodo' como parámetro de consulta

    // La URL incluye el parámetro 'metodo', pero 'entidad' se pasa en el cuerpo de la solicitud
    return this.Http.put(`${this.urlApi}${this.Controller}?${params.toString()}`, entidad, {
      headers: headers,
      responseType: 'json'
    });
  }
    public ActualizarSettleBrand(metodo: string, entidad: any): Observable<any> {
      let controller=metodo
      let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.put(this.urlApi + controller, entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
    }
  public ActualizarRelationShip(metodo: string, entidad: any): Observable<any> {
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params = new HttpParams().set('metodo', metodo); // Añade 'metodo' como parámetro de consulta

    // La URL incluye el parámetro 'metodo', pero 'entidad' se pasa en el cuerpo de la solicitud
    return this.Http.put(`${this.urlApi}${this.Controller}?${params.toString()}`, entidad, {
      headers: headers,
      responseType: 'json'
    });
  }
}
