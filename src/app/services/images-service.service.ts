import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImagesServiceService {
  private apiUrl = APIBASEURL+'upload/document'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  subirImagen(payload: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', payload.file); // archivo obligatorio

    // Puedes incluir metadata si quieres
    formData.append('entityType', payload.entityType);
    formData.append('entityId', payload.entityId);
    formData.append('documentType', payload.documentType);
    formData.append('description', payload.description);

    return this.http.post(this.apiUrl, formData);
  }
}