import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExtraDeleteService {

  urlApi = "https://localhost:44319/Api/";
  public Controller:string='DataArray'
  constructor(
    private Http: HttpClient
  ) { }
   //? RELATIONSHIP
   public Eliminar(metodo: string, id: number): Observable<any> {
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params = new HttpParams()
      .set('metodo', metodo) // Añade 'metodo' como parámetro de consulta
      .set('id', id.toString()); // Añade 'id' como parámetro de consulta
  
    // La URL incluye los parámetros 'metodo' e 'id'
    return this.Http.delete(`${this.urlApi}${this.Controller}`, {
      headers: headers,
      params: params,
      responseType: 'json'
    });
  }
  
    public EliminarSettleBrand(metodo: string, id: number): Observable<any> {
      let controller=metodo
      let Headers = new HttpHeaders().set("Accept", "application/json")
      let Params = new HttpParams().set('id', id);
    return this.Http.delete(this.urlApi + controller,
      {
        headers: Headers,
        params: Params,
        responseType: 'json'
      }
    )
    }
    public EliminarRelationShip(metodo: string, id: number): Observable<any> {
      let headers = new HttpHeaders().set("Accept", "application/json");
      let params = new HttpParams()
        .set('metodo', metodo) // Añade 'metodo' como parámetro de consulta
        .set('id', id.toString()); // Añade 'id' como parámetro de consulta
    
      // La URL incluye los parámetros 'metodo' e 'id'
      return this.Http.delete(`${this.urlApi}${this.Controller}`, {
        headers: headers,
        params: params,
        responseType: 'json'
      });
    }
}
