import { Injectable, InjectionToken } from '@angular/core';
import { ServicesDriversService } from './services-drivers.service';
import { ReadService } from './crudDataArray/extra-Read.service';
import { URL as APIBASEURL } from '../../enviroment/enviroment';


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
    private servicioApp: ReadService,
  ) {
    this.serviciosMapa.set('driver', servicioDriver);
  }


  public guardarStreet(event: Event, op: number, object: ListStreets) {
    var idStreet = 0;
    const eventName = event.toString();
    for (let i = 0; i < object.length; i++) {
      if (object[i].name === eventName) {
        idStreet = object[i].id;
        return idStreet;
      }
    }
    return idStreet;
  }

  public nombreCompleto(name:string,lm1:string, lm2:string): string {
    const nombre = name || '';
    const apellido1 = lm1 || '';
    const apellido2 = lm2 || '';

    if (nombre || apellido1 || apellido2) {
      return `${nombre} ${apellido1} ${apellido2}`;
    } else {
      // Todos los valores están vacíos
      return 'con nombre no especificado';
    }
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