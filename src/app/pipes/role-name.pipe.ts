import { Pipe } from '@angular/core';
import {  PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'roleName'
})
export class RoleNamePipe  {
  constructor() {}
  transformRolName(idUser: number): string {
    switch (idUser) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Invitado';
      case 3:
        return 'Usuario';
      default:
        return 'Desconocido';
    }
  }
  // transformDateIn(dateIn: Date): string {
  //   if (!dateIn) {
  //     return 'Fecha desconocida'; // O cualquier otro valor predeterminado que desees
  //   }
  //   // Formatea la fecha en el formato deseado (por ejemplo, 'dd/MM/yyyy hh:mm a')
  //   const formattedDate = this.datePipe.transformRolName(dateIn, 'dd/MM/yyyy hh:mm a');
  //   return formattedDate || ''; // Asegúrate de que siempre devuelva una cadena
  // }
}
