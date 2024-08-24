import { Pipe } from '@angular/core';
import {  PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SafeHtml,DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'roleName'
})
export class RoleNamePipe  {
  constructor(private datePipe: DatePipe,private sanitizer: DomSanitizer) {}

  transformRolName(idUser: number): string {
    switch (idUser) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuario';
      case 3:
        return 'Invitado';
      default:
        return 'Desconocido';
    }
  }
  transformDateIn(dateIn: Date): string {
    if (!dateIn) {
      return 'Fecha desconocida'; // O cualquier otro valor predeterminado que desees
    }
    // Formatea la fecha en el formato deseado (por ejemplo, 'dd/MM/yyyy hh:mm a')
    const formattedDate = this.datePipe.transform(dateIn, 'dd MMM yyyy hh:mm a');
    return formattedDate || ''; // Asegúrate de que siempre devuelva una cadena
  }
  // transformActiveBadge(active: boolean): SafeHtml {
  //   const badge = active
  //     ? '<span class="badge badge-success">A</span>'
  //     : '<span class="badge badge-danger">X</span>';
  //   return this.sanitizer.bypassSecurityTrustHtml(badge);
  // }
  transformActiveBadge(active: boolean): string {
    return active
      ? '<span class="badge badge-success">A</span>'
      : '<span class="badge badge-danger">X</span>';
  }
}
