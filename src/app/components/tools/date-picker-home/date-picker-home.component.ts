import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-date-picker-home',
  standalone: false,
  templateUrl: './date-picker-home.component.html',
  styleUrl: './date-picker-home.component.css'
})
export class DatePickerHomeComponent {
  @Output() rangeSelected = new EventEmitter<{ StartDate: string, EndDate: string }>();
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  apply() {
    const { start, end } = this.range.value;
    if (start && end) {
      // Normalize: primer día / último día (el datepicker ya hará esto si usas el componente modular)
      const s = new Date(start.getFullYear(), start.getMonth(), 1);
      const e = new Date(end.getFullYear(), end.getMonth(), 1);
      // this.loadData(s, e);
    }
  }
}