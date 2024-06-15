import { Component, OnInit } from '@angular/core';
import { ReadService } from './services/crudDataArray/extra-Read.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //variables de fechas Default
  public vencimiento: string;
  public nacimiento: string;
  constructor
    (
      private servicioApp: ReadService, private router: Router) {
      //todo lo que quiera cambiar aqui en el constructor
      this.vencimiento = '2025-06-06',
      this.nacimiento = '1990-06-06'
  }
  ngOnInit(): void {}
  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/newLogIn');
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
