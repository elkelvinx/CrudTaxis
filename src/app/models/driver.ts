import { TableColumn } from './../../app/components/tools/table/models/table-column';
export class driver {
    constructor
        (
            public id: number = 0,
            public name: string = '',
            public lm1: string = '',
            public lm2: string = '',
            public birth: Date = new Date('1900-01-01'),
            public birthS: string = '',
            public hireDate: Date = new Date(),
            public lastModD: Date = new Date(),
            public password: string = '',
            public phone: string = '',
            public settlement: number = 0,
            public st1: number = 0,
            public st2: number = 0,
            public st3: number = 0,
            public extNumber: number = 0,
            public admin: number = 0,
            public contactDrivers: number = 0,
            public adminName: string = '',
            public licenseEx: Date = new Date(),
            public licenseExS: string = '',
            public ingressPay: Date = new Date(),
            public status: number = 0,
            public statusS: string = 'Esperando',
            public street1: string = '',
            public street2: string = '',
            public street3: string = '',
            public settlementS: string = '',
        ) {

    }
}

export class TableColumnsStructure {
    static tableColumnsCase1: TableColumn[] = [
        { label: 'Nombres', def: 'name', dataKey: 'name' },
        { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
        { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
        { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
        { label: 'Administrador', def: 'adminName', dataKey: 'adminName' },
        { label: 'Vencimiento licencia', def: 'licenseEx', dataKey: 'licenseEx', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Fecha nacimiento', def: 'birth', dataKey: 'birth', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Fecha de ingreso', def: 'hireDate', dataKey: 'hireDate', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
        { label: 'Calle', def: 'street1', dataKey: 'street1' },
        { label: 'Pago ingreso', def: 'ingressPay', dataKey: 'ingressPay' },
    ];
    static tableColumnsCase2: TableColumn[] = [
        { label: 'Nombres', def: 'name', dataKey: 'name' },
        { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
        { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
        { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
        { label: 'Administrador', def: 'adminName', dataKey: 'adminName' },
        { label: 'Vencimiento licencia', def: 'licenseEx', dataKey: 'licenseEx', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Fecha de ingreso', def: 'hireDate', dataKey: 'hireDate', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
    ];
    columns: TableColumn[];
    constructor(numberOfColumns: number = 1) {
        if (numberOfColumns === 1) {
            this.columns = TableColumnsStructure.tableColumnsCase1;
        } else if (numberOfColumns === 2) {
            this.columns = TableColumnsStructure.tableColumnsCase2;
        } else {
            this.columns = []; // O cualquier configuración por defecto
        }
    }
}
