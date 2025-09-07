export class Sinister {
    constructor
        (
            public id: number = 0,
            public idUnit: number = 0,
            public ecoNumber: number = 0,
            public typeInsurance: string = '',
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
            public winOrLoose: number = 0,
            public winOrLooseS: string = '',
            public insurance: number = 0,
            public observations: string = '',
            public typeSinisterS: string = '',
            public insuranceS: string = '',
            public street1: string = '',
            public street2: string = '',
            public street3: string = '',
            public settlementS: string = '',
            public dateEvent: Date = new Date(),
        ) { }
        resetProperties() {
            this.id = 0;
            this.idUnit = 0;
            this.ecoNumber = 0;
            this.typeInsurance = '';
            this.workShop = '';
            this.admin = 0;
            this.adminS = '';
            this.driver = 0;
            this.driverS = '';
            this.crashCounterPart = '';
            this.personInvolved = 0;
            this.personInvolvedS = '';
            this.insuranceAplication = 0;
            this.insuranceAplicationS = '';
            this.typeSinister = 0;
            this.st1 = 0;
            this.st2 = 0;
            this.st3 = 0;
            this.settlement = 0;
            this.winOrLoose = 0;
            this.winOrLooseS = '';
            this.insurance = 0;
            this.observations = '';
            this.typeSinisterS = '';
            this.insuranceS = '';
            this.street1 = '';
            this.street2 = '';
            this.street3 = '';
            this.settlementS = '';
           this.dateEvent = new Date();
          }      
}
export class sinisterData{
    personInvolvedName: string[];
    winOrLoose: string[];
    insuranceAplication: string[];
    typeInsurance: string[];
    constructor() {
        this.personInvolvedName = ['Conductor', 'Administrador', 'Otros'];
        this.winOrLoose = ['Ganado', 'Perdido'];
        this.typeInsurance = ['Responsabilidad Civil', 'Amplia', 'Otros'];
        this.insuranceAplication = ['No Aplica', 'Aplica','Acuerdo'];
      }
}

export interface IdName {
    id: number;
    name: string;
}

export interface IdName2 {
    id: number;
    name: string;
    description?: string; // Add more fields as needed
}

export class SinistersWithID {
    personInvolvedName: IdName2[];
    winOrLoose: IdName2[];
    insuranceAplication: IdName[];
    typeInsurance: IdName[];

    constructor() {
        this.personInvolvedName = [
            { id: 1, name: 'Conductor' },
            { id: 2, name: 'Administrador' },
            { id: 3, name: 'Otros' }
        ];
        this.winOrLoose = [
            { id: 1, name: 'Ganado', description: 'El caso fue ganado' },
            { id: 2, name: 'Perdido', description: 'El caso fue perdido' }
        ];
        this.typeInsurance = [
            { id: 1, name: 'Responsabilidad Civil' },
            { id: 2, name: 'Amplia' },
            { id: 3, name: 'Otros' }
        ];
        this.insuranceAplication = [
            { id: 1, name: 'No Aplica' },
            { id: 2, name: 'Aplica' },
            { id: 3, name: 'Acuerdo' }
        ];
    }
}

import { TableColumn } from '../components/tools/table/models/table-column';
export class TableColumnsStructure {
    static tableColumnsCase1: TableColumn[] = [
        { label: 'ecoNumber', def: 'ecoNumber', dataKey: 'ecoNumber' },
        { label: 'Administrador', def: 'adminS', dataKey: 'adminS' },
        { label: 'Conductor', def: 'driverS', dataKey: 'driverS' },
        { label: 'Aseguradora', def: 'insuranceS', dataKey: 'insuranceS' },
        { label: 'Fecha', def: 'dateEvent', dataKey: 'dateEvent', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Typo de siniestro', def: 'typeSinisterS', dataKey: 'typeSinisterS' },
        // { label: 'Estado', def: 'winOrLooseS', dataKey: 'winOrLooseS' },
        { label: 'Nombre Chocado', def: 'crashCounterPart', dataKey: 'crashCounterPart' },
    ];
    static tableColumnsCase2: TableColumn[] = [
        { label: 'ecoNumber', def: 'ecoNumber', dataKey: 'ecoNumber' },
        { label: 'Administrador', def: 'adminS', dataKey: 'adminS' },
        { label: 'Conductor', def: 'driverS', dataKey: 'driverS' },
        { label: 'Aseguradora', def: 'insuranceS', dataKey: 'insuranceS' },
        { label: 'Fecha', def: 'dateEvent', dataKey: 'dateEvent', dataType: 'date', formatt: 'dd MMM yyyy' },
        { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
        { label: 'Calle', def: 'street1', dataKey: 'street1' },
        { label: 'Calle', def: 'street2', dataKey: 'street2' },
        { label: 'Calle', def: 'street3', dataKey: 'street3' },
        { label: 'Typo de siniestro', def: 'typeSinisterS', dataKey: 'typeSinisterS' },
        { label: 'Estado', def: 'winOrLooseS', dataKey: 'winOrLooseS' },
        { label: 'Nombre Chocado', def: 'crashCounterPart', dataKey: 'crashCounterPart' },
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
