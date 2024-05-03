export class structureData {
    constructor(
        public id: number = 0,
        public name: string = '',
    ) { }
};
export class structureModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public idSecond: number = 0,
        public secondS: string = '',
    ) { }
};
import { TableColumn } from './../../app/components/tools/table/models/table-column';
export class TableColumnsStructure {
    static tableColumns: TableColumn[] = [
        { label: 'Identificador', def: 'id', dataKey: 'id' },
        { label: 'Nombre', def: 'name', dataKey: 'name' },
    ]
    static tableColumns2: TableColumn[] = [
        { label: 'Identificador', def: 'id', dataKey: 'id' },
        { label: 'Nombres', def: 'name', dataKey: 'name' },
        { label: 'Id Colonia', def: 'settlement', dataKey: 'settlement' },
        { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
    ];
    static tableColumns3: TableColumn[] = [
        { label: 'Id', def: 'id', dataKey: 'id' },
        { label: 'Modelo', def: 'name', dataKey: 'name' },
        { label: 'Marca', def: 'brandName', dataKey: 'brandName' },
    ];
    columns: TableColumn[];
    constructor(numberOfColumns: number) {
        if (numberOfColumns === 1) {
            this.columns = TableColumnsStructure.tableColumns;
        } else if (numberOfColumns === 2) {
            this.columns = TableColumnsStructure.tableColumns2;
        }
        else if (numberOfColumns === 3) {
            this.columns = TableColumnsStructure.tableColumns3;
        }
    }
}