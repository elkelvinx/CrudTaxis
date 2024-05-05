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
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrl: '../edit-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatFormFieldModule],
})
export class InsertDialogComponent {
  //pregunta que hara el dialog
  @Input() text: string = '';
  @Input() name: any;
  @Input() typeDialog: boolean = true;
  @Input() information: string;
  @Input() indicator: string;
  @Input() numIndicator: number;
  @Input() object: any=[];
  @Input() array: any=[];
  //bool que devolvemos al padre
  @Output() data = new EventEmitter<any>();
  constructor(public dialog: MatDialog) { }

  ChangeName() {
    this.data.emit(true);
  }
  openDialogInsert(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any): void {
    const dialogRef = this.dialog.open(DialogUpdateLogic, {
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
  openDialogInsertBig(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any, array:any): void {
    const dialogRef = this.dialog.open(DialogInsertLogicBig, {
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
        array: array,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ChangeName();
      }
    });
  }
}

import { ReadService } from '../../../../services/crudDataArray/extra-Read.service';
import { ExtraUpdateService } from '../../../../services/crudDataArray/extra-Update.service';
import { insertClass } from '../switchCRUD/insert';
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'insert-logic.component.html',
  styleUrl: './../edit-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, CommonModule, MatInputModule, FormsModule],
})
export class DialogUpdateLogic {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public object: structureData={id:0,name:''};
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateLogic>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,
    public serviceUpdate: ExtraUpdateService,
    public serviceInsert: insertClass,

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
    this.serviceInsert.insertData(this.numIndicator, this.object);
    this.dialogRef.close(true);
  }
}
//! Insert GRANDE///////////////////////
import { AutoCompleteComponent } from '../../auto-complete/auto-complete.component';
import { PRUEBAService } from '../../../../services/cud_ZIP.service';
import { structureExtraData,structureData,extructureStreet, extructureModel } from '../../../../models/extraData';
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'insert-logic-big.component.html',
  styleUrl: './../edit-dialog.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    AutoCompleteComponent,
  ],
})
export class DialogInsertLogicBig {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public array: any;
  public arrayName:string[];
  public secondId: number;

  public object: structureExtraData;
 
  public objectStreet: extructureStreet={name:'',settlement:0};
  public objectBrand: extructureModel={name:'',idBrand:0};
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateLogic>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,
    public serviceUpdate: ExtraUpdateService,
    public serviceInsert: insertClass,
    //en duda este servicio
    public service: PRUEBAService<any>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.contentDialog = data.contentDialog;
    this.nameObj = data.nameObj;
    this.information = data.information;
    this.indicator = data.indicator;
    this.numIndicator = data.numIndicator;
    this.object = data.object;
    this.array = data.array;
    this.arrayName = this.array.map((array: any) => array.name);
  }
  insertData(event:Event)
  {
    debugger
    this.secondId = this.service.guardarStreetExtraData(event, this.array);
    this.object.settlement = this.secondId;
    this.object.idBrand= this.secondId
    
  }
  ChangeName() {
    debugger
    let dataToInsert;
    switch (this.numIndicator) {
      case 2:
        this.objectStreet.name = this.object.name;
        this.objectStreet.settlement = this.secondId;
        dataToInsert = this.objectStreet;
        break;
      case 4:
        this.objectBrand.name = this.object.name;
        this.objectBrand.idBrand = this.secondId;
        dataToInsert = this.objectBrand;
        break;
      // ... otros casos
    }

    if (dataToInsert) {
      this.serviceInsert.insertData(this.numIndicator, dataToInsert);
      this.dialogRef.close(true);
      console.log(dataToInsert);
    }
    else {  
      console.log('Error: no se encontró el caso para numIndicator ' + this.numIndicator);
    }
  }
}

