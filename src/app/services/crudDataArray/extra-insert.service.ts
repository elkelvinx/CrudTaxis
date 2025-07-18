import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { structureData } from '../../models/extraData';
@Injectable({
  providedIn: 'root'
})
export class ExtraInsertService {

  urlApi = "https://localhost:44319/Api/";
  public Controller: string = 'DataArray'
  private objeto: structureData = new structureData();
  constructor(
    private Http: HttpClient
  ) { }

  public Guardar(metodo: string, entidad: any): Observable<any> {
    this.objeto.name = entidad.name
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let params = new HttpParams().set('metodo', metodo); // Añade 'metodo' como parámetro de consulta

    return this.Http.post(`${this.urlApi}${this.Controller}?${params.toString()}`, this.objeto, { 
      headers: headers,
      params: params,
      responseType: 'json'
    });
  }
  // public Guardar(metodo: string, entidad: any): Observable<any> {
  //   let headers = new HttpHeaders().set("Content-Type", "application/json");
  //   return this.Http.post(`${this.urlApi}${this.Controller}?metodo=${metodo}`, entidad, {
  //     headers: headers,
  //     responseType: 'json'
  //   });
  // }
  public GuardarSettleBrand(metodo: string, entidad: any): Observable<any> {
    this.objeto.name = entidad.name
    debugger
    let controller=metodo
    let Headers = new HttpHeaders().set("Accept", "application/json")
  return this.Http.post(this.urlApi + controller, this.objeto,
    {
      headers: Headers,
      responseType: 'json'
    }
  )
  }
public GuardarRelationShip(metodo: string, entidad: any): Observable<any> {
  this.objeto.name = entidad.name
  let headers = new HttpHeaders().set("Accept", "application/json");
  let params = new HttpParams().set('metodo', metodo); // Añade 'metodo' como parámetro de consulta

  // La URL incluye el parámetro 'metodo', pero 'entidad' se pasa en el cuerpo de la solicitud
  return this.Http.post(`${this.urlApi}${this.Controller}?${params.toString()}`, this.objeto, {
    headers: headers,
    responseType: 'json'
  });
}
}
