export class sinister {
    constructor
        (
            public id: number = 0,
            public idUnit: number = 0,
            public ecoNumber: number = 0,
            public typeInsuranceS: string = '',
            public workShop: string = '',
            public admin: number = 0,
            public adminS: string = '',
            public driver: number = 0,
            public driverS: string = '',
            public crashCounterPart: string = '',
            public personInvolved: number = 0,
            public personInvolvedS: string = '',
            public insuranceAplication: number = 0,
            public insuranceAplicationS: string = '',
            public typeSinister: number = 0,
            public st1: number = 0,
            public st2: number = 0,
            public st3: number = 0,
            public settlement: number = 0,
            public winOrLose: number = 0,
            public winOrLoseS: string = '',
            public insurance: number = 0,
            public OBS: string = '',
            public typeSinisterS: string = '',
            public insuranceS: string = '',
            public street1: string = '',
            public street2: string = '',
            public street3: string = '',
            public settlementS: string = '',
            //extra que deberia ir
            public dateEvent: Date = new Date(),
            // public model: number = 0,
            // public yearModel: number = 0,
            // public brandName: string = "",
            // public modelName: string = "",
            //persona atendiendo
        ) { }
}
export class sinisterData{
    personInvolvedName: string[];
    winOrLose: string[];
    insuranceAplication: string[];
    constructor() {
        this.personInvolvedName = ['Conductor', 'Administrador', 'Otros'];
        this.winOrLose = ['Ganado', 'Perdido'];
        this.insuranceAplication = ['Responsabilidad Civil', 'Amplia', 'Otros'];
      }
}
import { TableColumn } from './../../app/components/tools/table/models/table-column';
export class TableColumnsStructure {
    static tableColumnsCase1: TableColumn[] = [
        { label: 'Nombres', def: 'name', dataKey: 'name' },
        { label: 'ecoNumber', def: 'ecoNumber', dataKey: 'ecoNumber' },
        { label: 'numero de carro', def: 'idUnit', dataKey: 'idUnit' },
        { label: 'Aseguradora', def: 'insuranceS', dataKey: 'insuranceS' },
        { label: 'Administrador', def: 'adminName', dataKey: 'adminName' },
        { label: 'Vencimiento licencia', def: 'licenseEx', dataKey: 'licenseEx', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
        { label: 'Calle', def: 'street1', dataKey: 'street1' },
        { label: 'Calle', def: 'street2', dataKey: 'street2' },
        { label: 'Calle', def: 'street3', dataKey: 'street3' },
        { label: 'Typo de siniestro', def: 'typeSinisterS', dataKey: 'typeSinisterS' },
    ];
    columns: TableColumn[];
    constructor(numberOfColumns: number = 1) {
        if (numberOfColumns === 1) {
            this.columns = TableColumnsStructure.tableColumnsCase1;
        } else {
            this.columns = []; // O cualquier configuración por defecto
        }
    }
}

