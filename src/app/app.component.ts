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
    this.consultarSettlements();
    // this.consultarStreets();
    this.consultarAdmins();
  }

  consultarSettlements() {
    this.servicioApp.consultarSettlements().subscribe(
      (data: any[]) => {
        this.listSettlement = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarAdmins() {
    this.servicioApp.consultarAdmins().subscribe(
      (data: any[]) => {
        this.listAdmin = data;
        // console.log(this.listAdmin);
      },
      error => {
        console.log(error);
      }
    )
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
}
