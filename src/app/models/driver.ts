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
            public idAdmin: number = 0,
            public adminName: string = '',
            public licenseEx: Date = new Date(),
            public licenseExS: string = '',
            public ingressPay: Date = new Date(),
            public status: number = 0,
            public street1: string = '',
            public street2: string = '',
            public street3: string = '',
            public settlementS: string = '',
        ) {

    }
}
export class driver2 {
    constructor
        (
            public id: number,
            public name: string,
            public lm1: string,
            public lm2: string,
            public birth: Date,
            public hireDate: Date,
            public lastModD: Date,
            public password: string,
            public phone: string,
            public settlement: number,
            public st1: number,
            public st2: number,
            public st3: number,
            public extNumber: number,
            public idAdmin: number,
            public admin: string,
            public licenseEx: Date,
            public ingressPay: Date,
            public status: number,
            public street1: string,
            public street2: string,
            public street3: string,
            public settlementS: string,
        ) {

    }
}
/*export class driverName {
    constructor
        (
            public id: number,
            public name: string,
            public lm1: string,
            public lm2: string,
        ) {

    }

}*/
