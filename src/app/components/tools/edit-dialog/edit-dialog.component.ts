import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatFormFieldModule],
})
export class EditDialogComponent {
  //pregunta que hara el dialog
  @Input() text: string = '';
  @Input() name: any;
  @Input() typeDialog: boolean = true;
  @Input() information: string;
  @Input() indicator: string;
  @Input() numIndicator: number;
  @Input() object: any;
  //bool que devolvemos al padre
  @Output() data = new EventEmitter<any>();
  constructor(public dialog: MatDialog) { }

  ChangeName() {
    this.data.emit(true);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '920px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        contentDialog: contentDialog,
        nameObj: name,
        information: information,
        indicator: indicator,
        numIndicator: numIndicator,
        object: object,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ChangeName();
      }
    });
  }
}
import { ReadService } from '../../../services/crudDataArray/extra-Read.service';
import { ExtraUpdateService } from '../../../services/crudDataArray/extra-Update.service';
import { updateClass } from './switchCRUD/update';
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'logic-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, CommonModule, MatInputModule, FormsModule],
})
export class DialogAnimationsExampleDialog {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public object: any;
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,
    public serviceUpdate: ExtraUpdateService,
    public serviceUpdates: updateClass,

    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.contentDialog = data.contentDialog;
    this.nameObj = data.nameObj;
    this.information = data.information;
    this.indicator = data.indicator;
    this.numIndicator = data.numIndicator;
    this.object = data.object;
  }
  ChangeName() {
    debugger;
    this.serviceUpdates.updateData(this.numIndicator, this.object);
    //this.updateData(this.numIndicator);
    this.dialogRef.close(true);
  }
  updateData(numIndicator: number) {
    //! Switch para guardar 
    switch (numIndicator) {
      case 1:
        //!Colonias
        this.serviceUpdate.ActualizarSettleBrand('settlement', this.object).subscribe(
          (data) => {
            console.log("Actualizado correctamente")
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
        this.serviceUpdate.ActualizarSettleBrand('brand', this.object).subscribe(
          (data) => {
            console.log("Actualizado correctamente")
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
        this.serviceUpdate.ActualizarRelationShip('relationShip', this.object).subscribe(
          (data) => {
            console.log("Actualizado correctamente")
          },
          error => {
            console.log(error);
          }
        )
        break;
      case 6:
        //! Status
        this.serviceUpdate.Actualizar('status', this.object).subscribe(
          (data) => {
            console.log("Actualizado correctamente")
          },
          error => {
            console.log(error + " fallo en status ");
          }
        )
        break;
      case 7:
        this.serviceUpdate.Actualizar('sinisterType', this.object).subscribe(
          (data) => {
            console.log("Actualizado correctamente")
          },
          error => {
            console.log(error + " fallo en typeSinister ");
          }
        )
        break;
      case 8:
        this.serviceUpdate.Actualizar('insuranceName', this.object).subscribe(
          (data) => {
            console.log("Actualizado correctamente")
          },
          error => {
            console.log(error + " fallo en insurers ");
          }
        )
        break;
    }
  }
}

