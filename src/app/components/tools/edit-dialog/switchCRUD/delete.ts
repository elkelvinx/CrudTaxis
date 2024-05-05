import { CommonModule } from '@angular/common';
import { ReadService, } from './../../../../services/crudDataArray/extra-Read.service';
import { ExtraDeleteService } from '../../../../services/crudDataArray/extra-Delete.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class deleteClass {
    constructor(
        public CommonModule: CommonModule,
        public serviceUnit: ReadService,
        public serviceDelete: ExtraDeleteService) { }
deleteData(numIndicator: number, object: any) {
    switch (numIndicator) {
      case 1:
        //!Colonias
        this.serviceDelete.EliminarSettleBrand('settlement', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en colonias ");
          }
        )
        break;
      case 2:
        //! Calles necesito crear todo especifico para ambos
        debugger;
        this.serviceDelete.EliminarSettleBrand('street', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en calles ");
          }
        )
        break;
      case 3:
        //! brand
        this.serviceDelete.EliminarSettleBrand('brand', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en colonias ");
          }
        )
        break;
      case 4:
        //! Model
        this.serviceDelete.EliminarSettleBrand('model', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en colonias ");
          }
        )
        break;
      case 5:
        //! relationShip
        debugger;
        this.serviceDelete.EliminarRelationShip('relationShip', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error);
          }
        )
        break;
      case 6:
        //! Status
        this.serviceDelete.Eliminar('status', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en status ");
          }
        )
        break;
      case 7:
        this.serviceDelete.Eliminar('sinisterType', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en typeSinister ");
          }
        )
        break;
      case 8:
        this.serviceDelete.Eliminar('insuranceName', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en insurers ");
          }
        )
        break;
    }
  }
}