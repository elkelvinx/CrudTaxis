export class permissionaire {
    constructor(
        public id: number = 0,
        public name: string = '',
        public lm1: string = '',
        public lm2: string = '',
        public phone: number = 0,
        public st1: number = 0,
        public st2: number = 0,
        public st3: number = 0,
        public settlement: number = 0,
        public extNumber: number = 0,
        public birth: Date = new Date('1900-01-01'),
        public birthS: string = '',
        public registerD: Date = new Date(),
        public lastModDate: Date = new Date(),
        public street1: string = '',
        public street2: string = '',
        public street3: string = '',
        public settlementS: string = '',
    ) { }
};
import { TableColumn } from './../../app/components/tools/table/models/table-column';
export class TableColumnsStructure {
    static tableColumnsCase1: TableColumn[] = [
        { label: 'Nombres', def: 'name', dataKey: 'name' },
        { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
        { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
        { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
        { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
        { label: 'Calle', def: 'street1', dataKey: 'street1' },
        { label: 'Numero Exterior', def: 'extNumber', dataKey: 'extNumber' },
        { label: 'Fecha de registro', def: 'registerD', dataKey: 'registerD', dataType: 'date', formatt: 'dd MMM yyyy' },
    ];
    static tableColumnsCase2: TableColumn[] = [
        { label: 'Nombres', def: 'name', dataKey: 'name' },
        { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
        { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
        { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
        // { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
        { label: 'Calle', def: 'street1', dataKey: 'street1' },
        // { label: 'Numero Exterior', def: 'extNumber', dataKey: 'extNumber' },
        { label: 'Fecha de registro', def: 'registerD', dataKey: 'registerD', dataType: 'date', formatt: 'dd MMM yyyy' },
    ];
    columns: TableColumn[];
    constructor(numberOfColumns: number) {
        if (numberOfColumns === 1) {
            this.columns = TableColumnsStructure.tableColumnsCase1;
        } else if (numberOfColumns === 2) {
            this.columns = TableColumnsStructure.tableColumnsCase2;
        } else {
            this.columns = [];
        }
    }
}
