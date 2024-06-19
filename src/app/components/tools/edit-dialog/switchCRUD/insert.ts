import { ExtraInsertService } from './../../../../services/crudDataArray/extra-insert.service'
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class insertClass {
    constructor(public serviceInsert: ExtraInsertService) { }
    insertData(numIndicator: number, object: any) {
        switch (numIndicator) {
            case 1:
                //!Colonias
                this.serviceInsert.GuardarSettleBrand('settlement', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:" + data)
                    },
                    error => {
                        console.log(error + " fallo en colonias ");
                    }
                )
                break;
            case 2:
                //! Calles necesito crear todo especifico para ambos
                this.serviceInsert.GuardarSettleBrand('street', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:'" + data+"'")
                    },
                    error => {
                        console.log(error + " fallo en calles ");
                    }
                )
                break;
            case 3:
                //! brand
                this.serviceInsert.GuardarSettleBrand('brand', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:" + data)
                    },
                    error => {
                        console.log(error + " fallo en colonias ");
                    }
                )
                break;
            case 4:
                //! Model
                this.serviceInsert.GuardarSettleBrand('model', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:'" + data+"'")
                    },
                    error => {
                        console.log(error + " fallo en calles ");
                    }
                )
                break;
            case 5:
                //! relationShip
                debugger;
                this.serviceInsert.GuardarRelationShip('relationShip', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:" + data)
                    },
                    error => {
                        console.log(error);
                    }
                )
                break;
            case 6:
                //! Status
                this.serviceInsert.Guardar('status', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:" + data)
                    },
                    error => {
                        console.log(error + " fallo en status ");
                    }
                )
                break;
            case 7:
                this.serviceInsert.Guardar('sinisterType', object).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:" + data)
                    },
                    error => {
                        console.log(error + " fallo en typeSinister ");
                    }
                )
                break;
            case 8:
                this.serviceInsert.Guardar('insuranceName', object.name).subscribe(
                    (data) => {
                        console.log("Guardado correctamente, mensaje:" + data)
                    },
                    error => {
                        console.log(error + " fallo en insurers ");
                    }
                )
                break;
        }
    }
}