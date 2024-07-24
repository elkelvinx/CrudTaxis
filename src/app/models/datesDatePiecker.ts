import { NativeDateAdapter, MatDateFormats } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    override format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            // Return the date in the format you want.
            return `${day}/${month}/${year}`;
        } else {
            return date.toDateString();
        }
    }
    override parse(value: any): Date | null {
        if (typeof value === 'string' && value.match(/^(3[01]|[12][0-9]|0?[1-9])\/(1[0-2]|0?[1-9])\/\d{4}$/)) {
            const str = value.split('/');
            const year = Number(str[2]);
            const month = Number(str[1]) - 1; // Los meses en JavaScript son 0-indexados
            const date = Number(str[0]);

            return new Date(year, month, date);
        }
        return super.parse(value); // Delegar al método de análisis predeterminado para otros casos
    }
}
export const CUSTOM_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    },
};
