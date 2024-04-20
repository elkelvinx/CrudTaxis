import { Component, OnInit } from '@angular/core';
import { AppService } from './services/services-app.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //clases
  public settlement: any = {
    id: 0,
    name: null
  };
  public street: any = {
    id: 0,
    name: null,
    idSettlement: 0,
    settlement: null,
  }
  public admin: any = {
    id: 0,
    name: null
  }
  //arreglos con info de la BD
  public listSettlement: any[] = [];
  public listStreet: any[] = [];
  public listAdmin: any[] = [];
  //variables de fechas Default
  public vencimiento: string;
  public nacimiento: string;

  constructor
    (
      private servicioApp: AppService) {
    //todo lo que quiera cambiar aqui en el constructor
    this.vencimiento = '2025-06-06',
      this.nacimiento = '1990-06-06'
  }

  ngOnInit(): void {
    // this.consultarStreets();
  }

  formatBirth(fecha: Date): string {
    let fechaString = formatDate(fecha, 'yyyy-MM-dd', 'en-US');

    if (fechaString.startsWith('0001-01-01')) { // Verifica si la fecha es '0001-01-01'
      fechaString = this.nacimiento; // Cambia la fecha a '1990-06-06'
    }
    return fechaString;
  }
  formatLicense(fecha: Date): string {
    let fechaString = formatDate(fecha, 'yyyy-MM-dd', 'en-US');

    if (fechaString.startsWith('0001-01-01')) { // Verifica si la fecha es '0001-01-01'
      fechaString = this.vencimiento; // Cambia la fecha a '1990-06-06'
    }
    return fechaString;
  }
  public changeAutocomplete(event: Event, array: any[]) {
    let idFinal: number = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].name == event) {
        idFinal = array[i].id;
        // debugger;
        break;
      }
    }
    return idFinal;
  }
}
