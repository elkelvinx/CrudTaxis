import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinisterService {
  urlApi = "https://localhost:44319/Api/";
  constructor(
    private Http: HttpClient
  ) { }
  public consultarSinisterId(id: number) {
    let controller = "Sinister";
    let params = new HttpParams().set("id", id);
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get(
      this.urlApi + controller,
      {
        headers: Headers,
        params: params,
        responseType: 'json'
      }
    )
  }

  public consultarSinister(): Observable<any[]> {
    let controller = "Sinister";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }

  public Grabar(Entidad: any) {
    let Controller = 'Sinister'
    debugger
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

  public Actualizar(Entidad: any) {
    let Controller = 'Sinister'
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.put(this.urlApi + Controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

  public Eliminar(id: any) {
    let Controller = 'Sinister'
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
