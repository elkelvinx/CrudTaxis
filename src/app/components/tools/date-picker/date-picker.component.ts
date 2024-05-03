import { Component, ViewEncapsulation, Input, Output, EventEmitter, } from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Da el formato a las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, CUSTOM_DATE_FORMATS } from '../../../models/datesDatePiecker';


/** @title Datepicker with custom date classes */
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

  constructor(private datePipe: DatePipe) { }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date2 = cellDate.getDate();
      this.dateF = date2

      // Highlight the 1st and 20th day of each month. esto se hara mas adelante
      // const holidays = getHolidaysInDecember(cellDate.getFullYear());
      // const isHoliday = holidays.includes(cellDate);
      // // return isHoliday ? 'example-custom-date-class' : '';
    }
    return '';
  };
  ChangeDate(event: any) {
    debugger
    // const valordateFinal = event.value;
    // const formattedDate = this.datePipe.transform(valordateFinal, 'dd/MM/yyyy');
    // this.date.emit(event.value);
    // console.log(formattedDate + " este es we")
    // debugger
    if (event instanceof Date) {
      this.date.emit(event);
    } else {
      // Si el evento es una cadena, entonces es una entrada manual
      // Intenta convertir la cadena a un objeto Date
      const parsedDate = Date.parse(event);
      if (!isNaN(parsedDate)) {
        this.date.emit(new Date(parsedDate));
      }
    }
  }

}

