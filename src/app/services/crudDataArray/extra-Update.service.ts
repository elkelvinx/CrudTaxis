import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExtraCUDService {

  urlApi = "https://localhost:44319/Api/";
  public Controller:string='DataArray'
  constructor(
    private Http: HttpClient
  ) { }
  public Grabar(Entidad: any) {
    //let Controller = 'Unit'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + this.Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }
  public Actualizar(Entidad: any) {
    let Controller = 'Unit'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.put(this.urlApi + Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

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
}
