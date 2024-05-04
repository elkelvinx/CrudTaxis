import { ExtraUpdateService } from './../../../../services/crudDataArray/extra-Update.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class updateClass {
  constructor(public serviceUpdate: ExtraUpdateService) { }
  updateData(numIndicator: number, object: any) {
    switch (numIndicator) {
      case 1:
        //!Colonias
        this.serviceUpdate.ActualizarSettleBrand('settlement', object).subscribe(
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
        break;
      case 3:
        //! brand
        this.serviceUpdate.ActualizarSettleBrand('brand', object).subscribe(
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
        break;
      case 5:
        //! relationShip
        debugger;
        this.serviceUpdate.ActualizarRelationShip('relationShip', object).subscribe(
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
        this.serviceUpdate.Actualizar('status', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en status ");
          }
        )
        break;
      case 7:
        this.serviceUpdate.Actualizar('sinisterType', object).subscribe(
          (data) => {
            console.log("Actualizado correctamente, mensaje:" + data)
          },
          error => {
            console.log(error + " fallo en typeSinister ");
          }
        )
        break;
      case 8:
        this.serviceUpdate.Actualizar('insuranceName', object).subscribe(
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