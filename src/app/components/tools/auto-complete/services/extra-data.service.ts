import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtraDataService {
  selectedBrandId: number = 0;
  nameBrand: string;
  constructor() { }
}
