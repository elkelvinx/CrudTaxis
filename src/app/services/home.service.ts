import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../../enviroment/enviroment';
import { DatesRange } from '../models/home';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private apiUrl = URL + '/home';

  constructor(private http: HttpClient) {}

  getDriversKpi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/driversKpi`);
  }

  getSinistersKpi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sinistersKpi`);
  }

  getDriversRange(DatesRange: DatesRange): Observable<any> {
    return this.http.post(`${this.apiUrl}/driversRange`, {
      StartDate: DatesRange.StartDate.toISOString(),
      EndDate: DatesRange.EndDate.toISOString()
    });
  }

  getSinistersRange(DatesRange: DatesRange): Observable<any> {
    return this.http.post(`${this.apiUrl}/sinistersRange`, {
      StartDate: DatesRange.StartDate.toISOString(),
      EndDate: DatesRange.EndDate.toISOString()
    });
  }
}
