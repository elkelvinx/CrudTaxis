import { Component, ViewEncapsulation, Input, Output, EventEmitter, } from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
//Da el formato a las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, CUSTOM_DATE_FORMATS } from '../../../models/datesDatePiecker';

@Component({
  selector: 'app-datepicker-date',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  //aplicar el estilo en todos los componentes de la app
  encapsulation: ViewEncapsulation.None,
  //Evita la necesidad de declararlo en un módulo y 
  //permite que el componente gestione sus propias dependencias.
  standalone: true,
  //servicios para formatear las fechas para componente padres e hijos
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
})
export class DatepickerDateClass {
  @Input() text: string = '';
  @Input() actualDate: Date = new Date();
  @Input() isDisabled: boolean = true;
  @Output() date = new EventEmitter<any>();
  dateF: any;
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date2 = cellDate.getDate();
      this.dateF = date2
    }
    return '';
  };
  ChangeDate(event: any) {
    if (event instanceof Date) {
      this.date.emit(event);
    } else {
      // Si el evento es una cadena, entonces intenta convertir la cadena a un objeto Date
      //no se si realmente hace algo
      const parsedDate = Date.parse(event);
      if (isNaN(parsedDate) && event!=null) {
        debugger
        this.date.emit(new Date(parsedDate));
      }
    }
  }

}

