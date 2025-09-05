import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UploadPhotosService {
  private apiUrl = APIBASEURL+'upload/document'; // Asegúrate de que esta URL sea correcta
  apiUrl2 = "https://localhost:44319/api/upload/document"; // Asegúrate de que esta URL sea correcta
  constructor(private http: HttpClient) { }

  uploadDocument(data: {
    entityType: string,
    entityId: number,
    documentType: string,
    description: string,
    file: File
  }): Observable<any> {
    const formData = new FormData();
    formData.append('EntityType', data.entityType);
    formData.append('EntityId', data.entityId.toString());
    formData.append('DocumentTypeCode', data.documentType);
    formData.append('Description', data.description);
    formData.append('File', data.file); // Aquí está el archivo real

    return this.http.post(this.apiUrl, formData);
  }
  public getDriverName(): Observable<any[]> {
    let controller = "Driver";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any[]>(
    `${this.apiUrl}/${encodeURIComponent(controller)}`,
      {
        headers: headers,
        responseType: 'json'
      }
    );
  }
}
