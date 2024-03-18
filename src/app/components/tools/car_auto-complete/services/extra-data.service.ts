import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtraDataService {
  nameBrand: string;
  //variables necesarias para dependencia entre inputs
  //Marca seleccionada
  selectedBrandId: number = 0;

  public models: { id: number; idBrand: number; name: string }[] = [];
  public bool: boolean = false;
  public typeAuto: number = 0;
  constructor() { }
}
