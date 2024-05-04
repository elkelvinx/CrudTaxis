import { Observable, of } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';
import { ServicesDriversService } from './services-drivers.service';
import { ServicesAdminService } from './services-admin.service';
import { ServicesPermissionaireService } from './services-permissionaire.service';
import { UnitsService } from './services-units.service';
import { SinisterService } from './sinister.service';
import { catchError, throwError, tap } from 'rxjs';
import { ReadService } from './crudDataArray/extra-Read.service';


export interface IGenericService<T> {
  Grabar(tipo: string, object: T): Observable<any>;
  Borrar(tipo: string, id: number): Observable<any>;
}

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

  public Grabar(tipo: string, obj: T): Observable<any> {
    const servicioSeleccionado = this.serviciosMapa.get(tipo);
    if (!servicioSeleccionado) {
      console.error(`No se encontró el servicio para el tipo: ${tipo}`);
      // Aquí puedes decidir cómo manejar este caso, por ejemplo, devolver un Observable vacío
      return of(null);
    }
    return servicioSeleccionado.Grabar(obj).pipe(
      tap((data: any) => console.log('Guardado correctamente', data)),
      catchError((error: Error) => {
        console.error('Ocurrió un error:', error.message);
        // Aquí puedes decidir cómo manejar los errores, por ejemplo, devolver un Observable con un error
        return throwError(() => error);
      })
    );
  }
  public actualizar(tipo: string, obj: string): Observable<any> {
    const servicioSeleccionado = this.serviciosMapa.get(tipo);
    if (!servicioSeleccionado) {
      console.error(`No se encontró el servicio para el tipo: ${tipo}`);
      // Aquí puedes decidir cómo manejar este caso, por ejemplo, devolver un Observable vacío
      return of(null);
    }
    return servicioSeleccionado.actualizar(obj).pipe(
      tap((data: any) => console.log('actualizado correctamente', data)),
      catchError((error: Error) => {
        console.error('Ocurrió un error:', error.message);
        // Aquí puedes decidir cómo manejar los errores, por ejemplo, devolver un Observable con un error
        return throwError(() => error);
      })
    );
  }
  public actualizarDataArray(tipo: string, obj: string,dataType:string): Observable<any> {
    const servicioSeleccionado = this.serviciosMapa.get(tipo);
    if (!servicioSeleccionado) {
      console.error(`No se encontró el servicio para el tipo: ${tipo}`);
      // Aquí puedes decidir cómo manejar este caso, por ejemplo, devolver un Observable vacío
      return of(null);
    }
    return servicioSeleccionado.actualizar(obj).pipe(
      tap((data: any) => console.log('actualizado correctamente', data)),
      catchError((error: Error) => {
        console.error('Ocurrió un error:', error.message);
        // Aquí puedes decidir cómo manejar los errores, por ejemplo, devolver un Observable con un error
        return throwError(() => error);
      })
    );
  }
  public Borrar(tipo: string, id: number): Observable<any> {
    const servicioSeleccionado = this.serviciosMapa.get(tipo);
    if (!servicioSeleccionado) {
      console.error(`No se encontró el servicio para el tipo: ${tipo}`);
      return of(null);
    }
    return servicioSeleccionado.Borrar(id).pipe(
      tap((data: any) => console.log('Borrado correctamente', data)),
      catchError((error: Error) => {
        console.error('Ocurrió un error:', error.message);
        return throwError(() => error);
      })
    );
  }
//esto podria ir en otro services
  public guardarStreet(event: Event, op: number, object: ListStreets) {
    const streetName = (event.target as HTMLInputElement).value;
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