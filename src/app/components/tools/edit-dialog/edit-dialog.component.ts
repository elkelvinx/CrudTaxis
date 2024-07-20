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
  @Input() array: any = [];
  //bool que devolvemos al padre
  @Output() data = new EventEmitter<any>();
  // @Output() secondId = new EventEmitter<any>();
  constructor(public dialog: MatDialog) { }
  ChangeName() {
    this.data.emit(true);
  }
  openDialogUpdate(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any): void {
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
  openDialogUpdateBig(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any, array: any): void {
    const dialogRef = this.dialog.open(DialogUpdateLogicBig, {
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
  openDialogUpdateUser(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string, information: string, indicator: string, numIndicator: number, object: any, array: any): void {
    const dialogRef = this.dialog.open(DialogUpdateUser, {
      width: '1520px',
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
//! UPDATE NORMAL///////////////////////
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
export class DialogUpdateLogic {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public object: any;
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateLogic>,
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
    this.dialogRef.close(true);
  }
}
//! Edit GRANDE///////////////////////
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';
import { PRUEBAService } from '../../../services/cud_ZIP.service';
import { structureExtraData } from '../../../models/extraData';
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'edit-logic-big.component.html',
  styleUrl: './edit-dialog.component.css',
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
export class DialogUpdateLogicBig {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public array: any;
  public arrayName: string[];
  public secondId: number;
  public object: structureExtraData;
  public result: any;
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateLogic>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,
    public serviceUpdate: ExtraUpdateService,
    public serviceUpdates: updateClass,
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
  insertData(event: Event) {
    debugger
    this.secondId = this.service.guardarStreetExtraData(event, this.array);
    this.object.settlement = this.secondId;
    this.object.idBrand = this.secondId

  }
  ChangeName() {
    debugger
    this.serviceUpdates.updateData(this.numIndicator, this.object);
    console.log(this.object);
    this.dialogRef.close(true);
  }
}
//! Edit para los users
import { RolesNames, UserModification} from '../../../models/user';
import { RoleNamePipe } from '../../../pipes/role-name.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { LogInService } from '../../../services/security/log-in.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'dialog-User-Insert',
  templateUrl: 'editUser.component.html',
  styleUrl: './edit-dialog.component.css',
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
    NgIf,
  ],
})
export class DialogUpdateUser {
  public contentDialog: String;
  public nameObj: any;
  public information: string;
  public indicator: string;
  public numIndicator: number;
  public array: UserModification[];
  public arrayRolName: string[];
  public object: UserModification;
  public isChecked: boolean = false;
  public idUser: number;
  //array con los roles disponibles
  public rolesNames: RolesNames[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
  ];
  public SuperPermissions: boolean = false;
  public pipeRole2: RoleNamePipe;
  constructor(
    public dialogRef: MatDialogRef<DialogUpdateLogic>,
    public CommonModule: CommonModule,
    public serviceUnit: ReadService,
    public serviceUpdate: updateClass,
    public serviceLogIn: LogInService,
    public extraSerive: PRUEBAService<any>,
    //en duda este servicio
    public service: PRUEBAService<any>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.pipeRole2 = new RoleNamePipe(datePipe);
    this.contentDialog = data.contentDialog;
    this.nameObj = data.nameObj;
    this.indicator = data.indicator;
    this.numIndicator = data.numIndicator;
    this.idUser = data.nameObj;
    this.array = data.array;
    //crea un objeto unicamente de nombres de los roles
    this.arrayRolName = this.rolesNames.map(
      array => array.name);
    if (Array.isArray(this.array)) {
      // Convertir this.idUser a número si es necesario
      const userId = Number(this.idUser);
      // Buscar el objeto que contiene el User con el id que necesitas
      const foundItem = this.array.find(item => item.User.id === userId);
      // Verificar si se encontró el objeto antes de asignarlo
      if (foundItem) {
        this.object = foundItem;
        // Buscar el nombre del rol actual del usuario
        const userRole = this.rolesNames.find(role => role.id === this.object.Permissions.idRole);
        if (userRole) {
          this.information = userRole.name;
        } else {
          console.error('Rol del usuario no encontrado');
        }
      } else {
        console.error('Usuario no encontrado');
      }
    } else {
      console.error('data.array no es un array');
    }
    console.log(this.array);
  }
  insertData(data: Event) {
    debugger
    this.object.Permissions.idRole = this.extraSerive.guardarStreetExtraData(data, this.rolesNames);
  }
  toggleSuperUser(): void {
    this.object.Permissions.driver = this.object.Permissions.admin = this.object.Permissions.permissionaire =
      this.object.Permissions.extraData = this.object.Permissions.sinister =
      this.object.Permissions.unit = this.object.Permissions.pdf = this.SuperPermissions;
  }
  unToggleSuperUser(): void {
    this.SuperPermissions = false;
  }
  passwordsMatch(): boolean {
    return this.object.User.password === this.object.User.confirmPassword;
  }
  hasPasswordError(passwordInput: any, passwordInput2: any): boolean {
    return passwordInput.invalid || passwordInput2.invalid || !this.passwordsMatch();
  }
  ChangeName() {
    debugger
    this.serviceLogIn.UpdateUser(this.object.User, this.object.Permissions).subscribe(
      (data) => {
        this.dialogRef.close(true);
        debugger
        console.log(data);

      }
    )
  }
}
