import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableColumn } from './models/table-column';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TABLE_ACTION } from './enums/action.enum';
import { TableActionExtraData } from './models/table-actions'
import { TableConfig } from './models/table-config';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-tableExtraData',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class Table2 implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  selection = new SelectionModel<any>(true, []);
  tableConfig: TableConfig | undefined;
  currentFilterValue: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //* dato que se le pasa al input a modificar
  @Input() variable: string
  //* nombre del tipo de dato a modificar
  @Input() indicator: string
  //* tipo de dato a modificar
  @Input() numIndicator: number
  @Input() typeDialog: boolean = true;
  @Input() array: any = []
  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }

  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() action: EventEmitter<TableActionExtraData> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    //  debugger; 
    // console.log(this.data + " hola"); console.log(this.columns)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelect() {
    this.select.emit(this.selection.selected);
  }

  setConfig(config: TableConfig) {
    this.tableConfig = config;

    if (this.tableConfig.isSelectable) {
      this.tableDisplayColumns.unshift('select');
    }

    if (this.tableConfig.showActions) {
      this.tableDisplayColumns.push('actions');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.onSelect();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }

  onEdit(row: any) {
    let numIndicator = this.numIndicator
    debugger;
    this.action.emit({ action: TABLE_ACTION.EDIT, row, numIndicator });
  }
  onUpdate(row: any) {
    let numIndicator = this.numIndicator
    debugger;
    this.action.emit({ action: TABLE_ACTION.EDIT, row, numIndicator });
  }

  onDelete(row: any) {
    let numIndicator = this.numIndicator
    this.action.emit({ action: TABLE_ACTION.DELETE, row, numIndicator });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.currentFilterValue = filterValue;
  }
}