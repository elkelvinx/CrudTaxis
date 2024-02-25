import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableColumn } from './models/table-column';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TABLE_ACTION } from './enums/action.enum';
import { TableAction } from './models/table-actions'
import { TableConfig } from './models/table-config';
//se crean variables para mostrar en la tabla
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];

  //quizas 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentFilterValue: string = '';
  tableConfig: TableConfig | undefined;

  //devolver valores
  @Output() action: EventEmitter<TableAction> = new EventEmitter();

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }


  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }
  onEdit(row: any) {
    this.action.emit({ action: TABLE_ACTION.EDIT, row });
  }

  onDelete(row: any) {
    this.action.emit({ action: TABLE_ACTION.DELETE, row });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filterPredicate)
    this.currentFilterValue = filterValue;

  }
  //esto es del boton editar y borrar
  setConfig(config: TableConfig) {
    this.tableConfig = config;

    if (this.tableConfig.isSelectable) {
      this.tableDisplayColumns.unshift('select');
    }

    if (this.tableConfig.showActions) {
      debugger
      this.tableDisplayColumns.push('actions');
    }
  }
  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }
}
