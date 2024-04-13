import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServicesAdminService } from '../../services/services-admin.service';
import { Admin } from '../../models/admin';
import { AppComponent } from '../../app.component';
import { AppService } from '../../services/services-app.service';
import { TableColumn } from '../tools/table/models/table-column';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableAction } from '../tools/table/models/table-actions';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})


export class AdminsComponent {

  public Admin = new Admin();
  public listAdmin: Admin[] = [];
  tableColumns: TableColumn[] = [];
  public settlements: any[] = [];
  public streets: any[] = [];

  public settlementName: any[] = [];
  public streetName: any[] = [];

  public ActSave: boolean = true;
  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };

  constructor(
    private datePipe: DatePipe,
    private servicioApp: AppService,
    private serviciosAdmin: ServicesAdminService,
    private App: AppComponent) { }

  ngOnInit(): void {
    this.consultarAdmins();
    this.consultarAdmin(this.Admin.id);
    this.setTableColumns();
  }
  public setTableColumns() {
    this.tableColumns = [
      { label: 'Nombres', def: 'name', dataKey: 'name' },
      { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
      { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
      { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
      { label: 'Correo Electronico', def: 'mail', dataKey: 'mail' },
      { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
      { label: 'Calle', def: 'street1', dataKey: 'street1' },
      { label: 'Numero Exterior', def: 'extNumber', dataKey: 'extNumber' },
      { label: 'Fecha de registro', def: 'registerD', dataKey: 'registerD', dataType: 'date', formatt: 'dd MMM yyyy' },
    ]
    /* this.tableColumns = [
      { label: 'Nombres', def: 'name', dataKey: 'name' },
      { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
      { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
      { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
      { label: 'Correo Electronico', def: 'mail', dataKey: 'mail' },
      { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
      { label: 'Calle', def: 'street1', dataKey: 'street1' },
      { label: 'Numero Exterior', def: 'extNumber', dataKey: 'extNumber' },
      { label: 'Fecha nacimiento', def: 'birthDate', dataKey: 'birthDate', dataType: 'date', formatt: 'dd MMM yyyy' },
      { label: 'Fecha de registro', def: 'registerD', dataKey: 'registerD', dataType: 'date', formatt: 'dd MMM yyyy' },
    ]*/
  }
  searchAdmin() {
    this.consultarAdmin(this.Admin.id);
  }
  onDelete(object: Admin) {
    // console.log('Delete', object);
    this.eliminarDialog(object.id);
  }
  onSelect(data: any) {
    console.log(data);
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.consultarAdmin(tableAction.row.id);
        break;
      case TABLE_ACTION.DELETE:
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  }
  consultarAdmin(idAdmin: any) {
    this.serviciosAdmin.consultarAdminId(idAdmin).subscribe(
      (data: any) => {
        this.Admin = data;
        this.consultarSettleName();
        this.consultarStreetName();
        if (this.Admin.id == 0) {
          this.Admin.birthDate = new Date('1970-01-01T00:00:00');
          this.Admin.registerD = this.Admin.lastModDate = new Date();
          this.ActSave = true
        }
        else 
        this.ActSave=false;
      },
      error => {
        console.log(error);
      }
    )
  }

  consultarAdmins() {
    this.serviciosAdmin.consultarAdmins().subscribe(
      (data: any[]) => {
        this.listAdmin = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  public grabar() {
    this.serviciosAdmin.Grabar(this.Admin).subscribe(
      (data) => {
        console.log("Guardado correctamente")
        this.consultarAdmins();
      },
      error => {
        console.log(error);
      }
    )
  }
  public actualizar() {
    this.serviciosAdmin.Actualizar(this.Admin).subscribe(
      (data) => {
        console.log("Actualizado correctamente")
        this.consultarAdmins();
      },
      error => {
        console.log(error);
      }
    )
  }
  public eliminar() {

    this.serviciosAdmin.Eliminar(this.Admin.id).subscribe(
      (data) => {
        console.log("Eliminado correctamente")
        this.consultarAdmins();
      },
      error => {
        console.log(error);
      }
    )
  }
  public eliminarDialog(id: number) {
    debugger;
    this.serviciosAdmin.Eliminar(id).subscribe(
      (data) => {
        console.log("Eliminado correctamente")
        this.consultarAdmins();
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarSettleName() {
    this.servicioApp.consultarSettlementName('n').subscribe(
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
    this.servicioApp.consultarStreetName('n').subscribe(
      (data: any[]) => {
        this.streets = data;
        this.streetName = this.streets.map(streets => streets.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  public guardarDireccion(event: Event) {
    console.log(event + "y el valor es ");
    for (let i = 0; i < this.settlements.length; i++) {
      if (this.settlements[i].name == event) {
        this.Admin.settlement = this.settlements[i].id;
        break;
      }
    }
  }
  public guardarStreet(event: Event, op: number) {
    console.log(event + "y el valor es ");
    for (let i = 0; i < this.streets.length; i++) {
      if (this.streets[i].name == event) {
        switch (op) {
          case 1:
            this.Admin.st1 = this.streets[i].id;
            this.Admin.street1 = this.streets[i].name;
            break;
          case 2:
            this.Admin.st2 = this.streets[i].id;
            this.Admin.street2 = this.streets[i].name;
            break;
          case 3:
            this.Admin.st3 = this.streets[i].id;
            this.Admin.street3 = this.streets[i].name;
            break;
        }
        break;
      }
    }
  }
}

