import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SinisterService {
  urlApi = APIBASEURL;
  controller = "Sinister";
  constructor(
    private Http: HttpClient
  ) { }
public consultarSinisterId(id: number) {
  let controller = "Sinister";
  let headers = new HttpHeaders().set("Accept", "application/json"); // corregí "aplication"
  return this.Http.get(
    `${this.urlApi}${controller}/${id}`, // 👈 id como segmento de ruta
    { headers: headers, responseType: 'json' }
  );
}


  public consultarSinister(): Observable<any[]> {
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(this.controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }

  public Grabar(Entidad: any) {
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.post(this.urlApi + this.controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

  public Actualizar(Entidad: any) {
    let Headers = new HttpHeaders().set("Accept", "application/json")
    return this.Http.put(this.urlApi + this.controller, Entidad,
      {
        headers: Headers,
        responseType: 'json'
      }
    )
  }

  public Eliminar(id: any) {
    let Headers = new HttpHeaders().set("Accept", "application/json")
    let Params = new HttpParams().set('id', id);
    return this.Http.delete(this.urlApi + this.controller,
      {
        headers: Headers,
        params: Params,
        responseType: 'json'
      }
    )
  }
}
