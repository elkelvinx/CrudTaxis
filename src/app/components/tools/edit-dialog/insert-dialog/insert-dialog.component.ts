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
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginComponent } from '../../../structure/login/login.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
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
    const dialogRef = this.dialog.open(DialogInsertLogic, {
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
   /**
    ** Este metodo es para MARCA De auto y USUARIO
   * Uso de cada parametro
   * @param contentDialog Message to display
   * @param name Name of the object
   * @param information nombre dato a insertar,es title dialog
   * @param indicator Indicator to display
   * @param numIndicator saber si es street o un model
   * @param object Object to insert
   * @param array Datos a mostrar en el autocomplete
   */
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

openDialogInsertUser(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any, array:any): void {
  const dialogRef = this.dialog.open(DialogInsertLogicUser, {
    width: '1620px',
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
  styleUrl:'./insertUser.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, CommonModule, MatInputModule, FormsModule],
})
export class DialogInsertLogic {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public object: structureData;
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogInsertLogic>,
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
    this.object.name = this.object.name;
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
  styleUrl: './insertUser.component.css',
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
    public dialogRef: MatDialogRef<DialogInsertLogic>,
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
    //this.object.settlement = this.secondId;
    this.object.idBrand= this.secondId;
  }
  //usado cuando son dos datos
  ChangeName() {
    debugger
    let dataToInsert;
    switch (this.numIndicator) {
      case 2:
        debugger
        this.objectStreet.name = this.object.name;
        this.objectStreet.settlement = this.secondId;
        dataToInsert = this.objectStreet;
        break;
      case 4:
        this.objectBrand.name = this.object.name;
        this.objectBrand.idBrand = this.secondId;
        dataToInsert = this.objectBrand;
        break;
        case 9:
                // ... otros casos
          break;
    }

    if (dataToInsert) {
      debugger
      this.serviceInsert.insertData(this.numIndicator, dataToInsert);
      this.dialogRef.close(true);
      console.log(dataToInsert);
    }
    else {  
      console.log('Error: no se encontró el caso para numIndicator ' + this.numIndicator);
    }
  }
}
//! Insert para los users
import { RolesNames, UserModification, user, userPermission } from '../../../../models/user';
import { RoleNamePipe } from '../../../../pipes/role-name.pipe';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { LogInService } from '../../../../services/security/log-in.service';
@Component({
  selector: 'dialog-User-Insert',
  templateUrl: 'insertUser-dialog.component.html',
  styleUrl: './insertUser.component.css',
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
    MatSlideToggleModule,
    MatDividerModule,
    NgIf
  ],
})
export class DialogInsertLogicUser {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public array: UserModification[];
  public arrayRolName:string[];
  public object: UserModification;
  public isChecked: boolean = false;
  //array con los roles disponibles
  public rolesNames : RolesNames[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
];
public SuperPermissions:boolean=false;
  public pipeRole2: RoleNamePipe;
  constructor(
    public dialogRef: MatDialogRef<DialogInsertLogic>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,
    public serviceInsert: insertClass,
    public serviceLogIn: LogInService,
    public extraSerive: PRUEBAService<any>,
    //en duda este servicio
    public service: PRUEBAService<any>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    //this.pipeRole2= new RoleNamePipe(datePipe);
    this.contentDialog = data.contentDialog;
    this.nameObj = data.nameObj;
    this.information = data.information;
    this.indicator = data.indicator;
    this.numIndicator = data.numIndicator;
    this.object = data.object;
    this.object.User= new user();
    this.object.Permissions= new userPermission();
    this.array = data.array;  
      this.arrayRolName = this.rolesNames.map(
      array => array.name);  
      console.log(this.rolesNames) 
      debugger
  }
 insertData(data:Event){
  this.object.Permissions.idRole = this.extraSerive.guardarStreetExtraData(data,this.rolesNames);
 }
 toggleSuperUser(): void {
  this.object.Permissions.driver = this.object.Permissions.admin = this.object.Permissions.permissionaire =
  this.object.Permissions.extraData=this.object.Permissions.sinister=
  this.object.Permissions.unit=this.object.Permissions.pdf = this.SuperPermissions;
}
unToggleSuperUser(): void {
  this.SuperPermissions = false;
}
passwordsMatch(): boolean {
  return this.object.User.password === this.object.User.confirmPassword;
}
hasPasswordError(passwordInput: any, passwordInput2: any): boolean {
  return passwordInput.invalid || passwordInput2.invalid || this.passwordsMatch();
}
 ChangeName(){
  console.log(this.object)
  debugger
  this.serviceLogIn.CreateUser(this.object.User,this.object.Permissions).subscribe(
  (data)=> {
    console.log(data);
  }
  )
 }
}
