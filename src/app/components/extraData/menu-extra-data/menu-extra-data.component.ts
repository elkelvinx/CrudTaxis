import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../tools/table/models/table-config';
import { TableActionExtraData } from '../../../components/tools/tableExtraData/models/table-actions'
import { TableColumnsStructure, structureUserTable } from '../../../models/extraData';
import { structureData } from '../../../models/extraData';
import { ReadService } from '../../../services/crudDataArray/extra-Read.service';
import { structureStreet } from '../../../models/extraData';
import { deleteClass } from '../../tools/edit-dialog/switchCRUD/delete';
import {DialogAnimationsExampleDialog} from '../../tools/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogInService } from '../../../services/security/log-in.service';
import { UserModification, userInsert } from '../../../models/user';
import { RoleNamePipe } from '../../../pipes/role-name.pipe';
 import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-menu-extra-data',
  templateUrl: './menu-extra-data.component.html',
  styleUrl: './menu-extra-data.component.css'
})
export class MenuExtraDataComponent implements OnInit {
  public tableColumns = new TableColumnsStructure(1);
  public columnsStreet = new TableColumnsStructure(2);
  public columnsModels = new TableColumnsStructure(3);
  public columnsUsers = new TableColumnsStructure(4);
  public arrays: structureData[] = [];

  public settlements: structureData[] = [];
  public settlementName: string[] = [];
  public streets: structureStreet[] = [];
  public streetName: string[] = [];
  public models: structureStreet[] = [];
  public modelName: string[] = [];
  public brands: structureData[] = [];
  public brandName: string[] = [];
  
  public insurers: structureData[] = [];
  public relationships: structureData[] = [];
  public status: structureData[] = [];
  public typeSinister: structureData[] = [];
  //usa la clase users
  public userInsert: userInsert[] = [];
  public UserTable: structureData[] = [];
  public user: UserModification[];
  public pipeRole2: RoleNamePipe;

  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };
  onTableAction(tableAction: TableActionExtraData) {
    debugger;
    if (tableAction.action == 1) {
      this.deleteSearch(tableAction);
    }
    else
      this.actualizarTabla(tableAction);
  }
  deleteSearch(tableAction: TableActionExtraData) {
    debugger;
    switch (tableAction.numIndicator) {
      case 1:
        this.deleteService.deleteData(1, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 2:
        this.deleteService.deleteData(2, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 3:
        this.deleteService.deleteData(3, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 4:
        this.deleteService.deleteData(4, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 5:
        this.deleteService.deleteData(5, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 6:
        this.deleteService.deleteData(6, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 7:
        this.deleteService.deleteData(7, tableAction.row.id);
        this.actualizarTabla(tableAction);
        break;
      case 8:
        this.deleteService.deleteData(8, tableAction.row.id);
        this.actualizarTabla(tableAction);
    }
  }
  actualizarTabla(tableAction: TableActionExtraData) {
    debugger;
    switch (tableAction.numIndicator) {
      case 1:
        this.consultarSettleName();
        break;
      case 2:
        this.consultarStreetName();
        break;
      case 3:
        this.consultarBrandName();
        break;
      case 4:
        this.consultarModelName();
        break;
      case 5:
        this.consultarRelationshipsName();
        break;
      case 6:
        this.consultarStatusName();
        break;
      case 7:
        this.consultarTypeSinisterName();
        break;
      case 8:
        this.consultarInsurersName();
        break;
    }
  }
  constructor(private readService: ReadService, 
    public deleteService: deleteClass,
    public dialog: MatDialog,
    private router:Router,
    private logIn: LogInService,
    private datePipe: DatePipe,
  ) {
     this.pipeRole2= new RoleNamePipe(datePipe);
   }
  ngOnInit(): void {
    this.consultarSettleName();
    this.consultarStreetName();
    this.consultarModelName();
    this.consultarBrandName();
    this.consultarInsurersName();
    this.consultarRelationshipsName();
    this.consultarStatusName();
    this.consultarTypeSinisterName();
    this.consultarUsersName();
  }
  consultarSettleName() {
    this.readService.consultarSettlementName('n').subscribe(
      (data: any[]) => {
        this.settlements = data;
        this.settlementName = this.settlements.map(settlement => settlement.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarStreetName() {
    this.readService.consultarStreets().subscribe(
      (data: any[]) => {
        this.streets = data;
        this.streetName = this.streets.map(streets => streets.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarModelName() {
    this.readService.consultarModelsName().subscribe(
      (data: any[]) => {
        this.models = data;
        this.modelName = this.models.map(models => models.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarBrandName() {
    this.readService.consultarBrandsName().subscribe(
      (data: any[]) => {
        this.brands = data;
        this.brandName = this.brands.map(brands => brands.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarInsurersName() {
    this.readService.consultarInsuranceName().subscribe(
      (data: any[]) => {this.insurers = data;},
      error => {
        console.log(error);
      }
    )
  }
  consultarRelationshipsName() {
    this.readService.consultarRelations().subscribe(
      (data: any[]) => {this.relationships = data;},
      error => {
        console.log(error);
      }
    )
  }
  consultarStatusName() {
    this.readService.consultarStatus().subscribe(
      (data: any[]) => {this.status = data;},
      error => {
        console.log(error);
      }
    )
  }
  consultarTypeSinisterName() {
    this.readService.consultarTypeSinister().subscribe(
      (data: any[]) => {
        debugger
        this.typeSinister = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarUsersName() {
    this.logIn.consultarUsers().subscribe(
      (data: UserModification[]) => {
        debugger
        this.user=data;
        this.UserTable = this.user.map(data => ({
          id: data.User.id,
          name: data.User.name,
          email: data.User.email,
          dateCreated: this.pipeRole2.transformDateIn(data.User.dateCreated),
          roleName: this.pipeRole2.transformRolName(data.Permissions.idRole),
        }));       
      },
      error => {
        console.log(error);
      }
    )
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '530px',
      height: '180px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        contentDialog: contentDialog,
        nameObj: name,
        title: 'Ir a New LogIn',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/newLogIn']);
      }
    });
  }
}