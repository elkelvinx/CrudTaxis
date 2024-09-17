export class InfoHistoryLog {
    constructor(
      public id: number,
      public idUser: number,
      public userName: string,
      public roleName: string,
      public entry: string,
      public exits: string
    ) {}
  }
  
  export class ChangeLog {
    constructor(
      public id: number,
      public userName: string,
      public idUser: number,
      public roleName: string,
      public nameTable: string,
      public modDate: string,
      public DML: string
    ) {}
  }
  
  export class ErrorLog {
    constructor(
      public id: number,
      public userName: string,
      public idUser: number,
      public nameTable: string,
      public MessageError: string,
      public DateError: string,
      public DML: string
    ) {}
  }
  export const DMLs: string[]= [
    "INSERT",
    "UPDATE",
    "DELETE",   
    "EXECUTING ERROR",
    "CLOSED CONNECTION",
  ];
  //extructura de DML
  export class DMLBase {
    constructor(
      public id: number,
      public name: string,

    ){}
  }
  //DML NAME WITH NAMES
  export const DML: DMLBase[] = [
    new DMLBase(1, "INSERT"),
    new DMLBase(2, "UPDATE"),
    new DMLBase(3, "DELETE"),
    new DMLBase(69, "CLOSED CONNECTION"),
    new DMLBase(999, "EXECUTING ERROR")
  ];

import { TableColumn } from './../../app/components/tools/table/models/table-column';
export class TableColumnsStructure {
  //tabla de ErrorLog
    static tableColumns: TableColumn[] = [
        { label: 'ID', def: 'id', dataKey: 'id' },
        { label: 'UserId', def: 'idUser', dataKey: 'idUser' },
        { label: 'Nombre del usuario', def: 'userName', dataKey: 'userName' },
        { label: 'Tabla', def: 'nameTable', dataKey: 'nameTable' },
        { label: 'Mensaje de error', def: 'messageError', dataKey: 'messageError' },
        { label: 'Query', def: 'query', dataKey: 'query' },
        { label: 'Fecha evento', def: 'dateError', dataKey: 'dateError' },
        { label: 'Accion', def: 'DML', dataKey: 'DML' },        
    ]
    //tabla de historial de cambios
    static tableColumns2: TableColumn[] = [
      { label: 'ID', def: 'id', dataKey: 'id' },
      { label: 'UserId', def: 'idUser', dataKey: 'idUser' },
      { label: 'Nombre del usuario', def: 'userName', dataKey: 'userName' },
      { label: 'Rol', def: 'roleName', dataKey: 'roleName' },
      { label: 'Tabla', def: 'nameTable', dataKey: 'nameTable' },      
      { label: 'Query', def: 'query', dataKey: 'query' },
      { label: 'Fecha', def: 'dateError', dataKey: 'dateError' },
      { label: 'Accion', def: 'DML', dataKey: 'DML' },      
    ];  
    //tabla de historial de logs
    static tableColumns3: TableColumn[] = [
        { label: 'ID', def: 'id', dataKey: 'id' },
        { label: 'UserId', def: 'idUser', dataKey: 'idUser' },
        { label: 'Nombre del usuario', def: 'userName', dataKey: 'userName' },
        { label: 'Rol', def: 'roleName', dataKey: 'roleName' },
        { label: 'Inicio', def: 'entry', dataKey: 'entry' },     
        { label: 'Finalizacion', def: 'exits', dataKey: 'exits' },
    ];
    columns: TableColumn[];
    constructor(numberOfColumns: number) {
        switch (numberOfColumns) {
            case 1:
                this.columns = TableColumnsStructure.tableColumns;
                break;
            case 2:
                this.columns = TableColumnsStructure.tableColumns2;
                break;
            case 3:
                this.columns = TableColumnsStructure.tableColumns3;
                break;
        }
    }
}
