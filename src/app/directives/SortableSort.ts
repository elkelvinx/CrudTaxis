import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SortDirection as MatSortDirection } from '@angular/material/sort';
export interface LogEntry {
    id: number;
    UserName: string;
    idUser: number;
    roleName: string;
    nameTable: string;
    modDate: Date;
    DML: string;
    query: string;
  }
  
export type SortColumn = keyof LogEntry | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = this.direction === 'asc' ? 'desc' : this.direction === 'desc' ? '' : 'asc';
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
