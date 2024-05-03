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
  //bool que devolvemos al padre
  @Output() data = new EventEmitter<any>();
  constructor(public dialog: MatDialog) { }

  ChangeName() {
    this.data.emit(true);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number): void {
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
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,

    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.contentDialog = data.contentDialog;
    this.nameObj = data.nameObj;
    this.information = data.information;
    this.indicator = data.indicator;
    this.numIndicator = data.numIndicator;
  }
  ChangeName() {
    this.updateData(this.numIndicator);
    this.dialogRef.close(true);
  }
  updateData(numIndicator: number) {
   //! Switch para guardar 
   switch (numIndicator) {
      case 1:
        //!Colonias
        // this.serviceUnit.Actualizar(this.units).subscribe(
        //   (data) => {
        //     debugger
        //     console.log("Actualizado correctamente")
        //     this.consultarUnits();
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // )
        break;
      case 2:
        this.nameObj = this.indicator;
        break;
      case 3:
        this.nameObj = this.indicator;
        break;
      case 4:
        this.nameObj = this.indicator;
        break;
      case 5:
        this.nameObj = this.indicator;
        break;
   }
  }
}

