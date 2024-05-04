import { Observable, of } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';
import { ServicesDriversService } from './services-drivers.service';
import { ServicesAdminService } from './services-admin.service';
import { ServicesPermissionaireService } from './services-permissionaire.service';
import { UnitsService } from './services-units.service';
import { SinisterService } from './sinister.service';
import { catchError, throwError, tap } from 'rxjs';
import { ReadService } from './crudDataArray/extra-Read.service';


export interface IGenericService<T> {}

export class streets {
  id: number;
  name: string;
}
export type ListStreets = streets[];

// Definimos un token de inyección que será utilizado para inyectar diferentes servicios.
export const SERVICE_TOKEN = new InjectionToken('service-token');

@Injectable({
  providedIn: 'root'
})
export class PRUEBAService<T> implements IGenericService<T> {
  private serviciosMapa = new Map<string, any>();
  private settlements: any[] = [];
  private settlementName: any[] = [];
  private streets: any[] = [];
  private streetName: any[] = [];

  constructor(
    servicioDriver: ServicesDriversService,
    servicioAdmin: ServicesAdminService,
    servicioSinister: SinisterService,
    servicioUnit: UnitsService,
    servicioPermissionario: ServicesPermissionaireService,
    private servicioApp: ReadService,
  ) {
    this.serviciosMapa.set('driver', servicioDriver);
    this.serviciosMapa.set('admin', servicioAdmin);
    this.serviciosMapa.set('sinister', servicioSinister);
    this.serviciosMapa.set('unit', servicioUnit);
    this.serviciosMapa.set('permissionaire', servicioPermissionario);

  }
  public guardarStreet(event: Event, op: number, object: ListStreets) {
    var idStreet = 0;
    const eventName = (event.target as HTMLInputElement).value;
    for (let i = 0; i < object.length; i++) {
      if (object[i].name === eventName) {
        idStreet = object[i].id;
        return idStreet;
      }
    }
    return idStreet;
  }

  public guardarStreetExtraData(event: Event, object: any) {
    var id = 0;
    const eventName = event;
    for (let i = 0; i < object.length; i++) {
      if (object[i].name === eventName) {
        id = object[i].id;
        debugger;
        return id;
      }
    }
    return id;
    
  }
  
 public consultarSettleName() {
    this.servicioApp.consultarSettlementName('n').subscribe(
      (data: any[]) => {
        this.settlements = data;
        this.settlementName = this.settlements.map(settlement => settlement.name);
      },
      error => {
        console.log(error);
      }
    )
  }
 public consultarStreetName() {
    this.servicioApp.consultarStreetName('n').subscribe(
      (data: any[]) => {
        this.streets = data;
        this.streetName = this.streets.map(streets => streets.name);
      },
      error => {
        console.log(error);
      }
    )
  }
}