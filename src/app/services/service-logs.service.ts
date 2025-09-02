import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './security/authService.service';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogsService {
  urlApi = APIBASEURL+"login/";
  constructor(
    private Http: HttpClient
  ) { }

  public GetHistoryLogIn(): Observable<any[]> {
    let controller = "historyLogIn";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  }

  public GetChangeLog(): Observable<any[]> {
    let controller = "changeLog";
    let Headers = new HttpHeaders().set("Accept", "aplication/json");
    return this.Http.get<any[]>(
      `${this.urlApi}${encodeURIComponent(controller)}`,
      {
        headers: Headers,
        responseType: 'json'
      }
    );
  } 

  public GetErrorLog(): Observable<any[]> {
    let controller = "errorLog";
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
