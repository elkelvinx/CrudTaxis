import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL as APIBASEURL } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImagesServiceService {
  private apiUrl = 'https://localhost:44319/Api/guardarImagen';

  constructor(private http: HttpClient) { }

  subirImagen(archivo: File, categoriaId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('Archivo', archivo, archivo.name);
    formData.append('categoriaId', categoriaId.toString());

    return this.http.post(`${this.apiUrl}/GuardarImagen`, formData);
  }
}
