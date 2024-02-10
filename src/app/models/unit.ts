export class unit {
    constructor
        (
            public id: number = 0,
            public ecoNumber: number = 0,
            public model: number = 0,
            public yearModel: number = 0,
            public color: string = "",
            public serie: string = "",
            public motor: string = "",
            public plate: string = "",
            public registerDate: Date = new Date(),
            public lastModDate: Date = new Date(),
            public expInsurance: Date = new Date(),
            public idAdmin: number = 0,
            public adminName: string = "",
            public brandName: string = "",
            public modelName: string = "",
        ) { }
}
export class Unit2 {
    id: number = 0;
    ecoNumber: number = 0;
    model: number = 0;
    yearModel: number = 0;
    color: string = "";
    serie: string = "";
    motor: string = "";
    plate: string = "";
    registerDate: Date = new Date();
    lastModDate: Date = new Date();
    expInsurance: Date = new Date();
    idAdmin: number = 0;
    adminName: string = "";
    brandName: string = "";
    modelName: string = "";
}

/*

export class muchasUNITS{
    public units:  unit[] = [];
constructor(
    units: []
    )
}*/