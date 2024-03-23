import { Component } from '@angular/core';
import { ServicesPermissionaireService } from '../../services/services-permissionaire.service';
import { DatePipe } from '@angular/common';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableColumn } from '../tools/table/models/table-column';
import { permissionaire } from '../../models/permissionaire'
import { TableAction } from '../tools/table/models/table-actions';
import { AppService } from '../../services/services-app.service';

@Component({
  selector: 'app-permissionaires',
  templateUrl: './permissionaires.component.html',
  styleUrl: './permissionaires.component.css'
})
export class PermissionairesComponent {

  // public permissionaire : any = {
  //   id: 0,
  //   name: null,
  //   lm1: null,
  //   lm2: null,
  //   birth: null,
  //   phone: null,
  //   st1:0,
  //   st2:0,
  //   st3:0,
  //   settlement:0,
  //   extNumber:0,
  //   registerD: null,
  //   lastModDate: null,
  //   street1: null,
  //   street2: null,
  //   street3: null,
  //   settlementS: null,   
  //    fecha : new Date()
  // };

  public permissionaire = new permissionaire();
  tableColumns: TableColumn[] = [];
  public settlements: any[] = [];
  public streets: any[] = [];

  public settlementName: any[] = [];
  public streetName: any[] = [];

  public isLoadedSt: boolean = false;
  public isLoaded2: boolean = false;
  public loadT: boolean = false;
  public ActSave: boolean = true;
  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: false,
    showActions: true,
    showFilter: true,
  };

  public listPermissionaire: any[] = [];
  public setTableColumns() {
    this.tableColumns = [
      { label: 'Nombres', def: 'name', dataKey: 'name' },
      { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
      { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
      { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
      { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
      { label: 'Calle', def: 'street1', dataKey: 'street1' },
      { label: 'Numero Exterior', def: 'extNumber', dataKey: 'extNumber' },
      { label: 'Fecha de registro', def: 'registerD', dataKey: 'registerD', dataType: 'date', formatt: 'dd MMM yyyy' },
    ]
  }
  constructor(
    private datePipe: DatePipe,
    private servicioPermission: ServicesPermissionaireService,
    private servicioApp: AppService,
  ) { }

  ngOnInit(): void {
    this.consultarPermission(this.permissionaire.id);
    this.consultarPermissions();
    this.setTableColumns()
  }
  //LastModD se obtiene automaticamente en el backend

  searchPermission() {
    this.consultarPermission(this.permissionaire.id);
  }
  consultarPermission(idPermission: any) {
    this.servicioPermission.consultarPermissionId(idPermission).subscribe(
      (data: any) => {
        this.permissionaire = data;
        // this.consultarPermissions();
        this.consultarSettleName();
        this.consultarStreetName();
        this.isLoadedSt = true;
        debugger;
        if (this.permissionaire.id !== 0)
          this.ActSave = false;
        else {
          this.permissionaire.birth = new Date('1970-01-01T00:00:00');
          this.permissionaire.registerD = this.permissionaire.lastModDate = new Date();
          this.ActSave = true;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarPermissions() {

    this.servicioPermission.consultarPermissions().subscribe(
      (data: any[]) => {
        this.listPermissionaire = data;
        this.loadT = true;
      },
      error => {
        console.log(error);

      }
    )
  }
  public grabar() {
    this.servicioPermission.Grabar(this.permissionaire).subscribe(
      (data) => {
        debugger;
        console.log("Guardado correctamente")
        this.consultarPermissions();
      },
      error => {
        console.log(error);
      }
    )
  }
  public actualizar() {
    this.servicioPermission.Actualizar(this.permissionaire).subscribe(
      (data) => {
        debugger;
        console.log("Actualizado correctamente")
        this.consultarPermissions();
      },
      error => {
        console.log(error);
      }
    )
  }
  public eliminar() {
    debugger;
    this.servicioPermission.Eliminar(this.permissionaire.id).subscribe(
      (data) => {
        debugger;
        console.log("Eliminado correctamente")
        console.log(data)
        this.consultarPermissions();
      },
      error => {
        console.log(error);
      }
    )
  }
  public eliminarDialog(id: number) {
    debugger;
    this.servicioPermission.Eliminar(id).subscribe(
      (data) => {
        console.log("Eliminado correctamente")
        this.consultarPermissions();
      },
      error => {
        console.log(error);
      }
    )
  }
  onDelete(object: permissionaire) {
    this.eliminarDialog(object.id);
  }
  onSelect(data: permissionaire) {
    console.log(data);
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.consultarPermission(tableAction.row.id);
        break;

      case TABLE_ACTION.DELETE:
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  }

  consultarSettleName() {
    this.servicioApp.consultarSettlementName('n').subscribe(
      (data: any[]) => {
        this.settlements = data;
        this.settlementName = this.settlements.map(settlement => settlement.name);
        if (this.permissionaire.settlementS == null) {
          this.isLoadedSt = false;
        }
        else {
          //aqui deberia hacer algo jasjasjs
        }
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
        if (this.permissionaire.street1 == null) {
          this.isLoadedSt = true;
        }
        else {
          console.log('PEDRO PICAPIEDRA')
        }
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
        this.permissionaire.settlement = this.settlements[i].id;
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
            this.permissionaire.st1 = this.streets[i].id;
            this.permissionaire.street1 = this.streets[i].name;
            break;
          case 2:
            this.permissionaire.st2 = this.streets[i].id;
            this.permissionaire.street2 = this.streets[i].name;
            break;
          case 3:
            this.permissionaire.st3 = this.streets[i].id;
            this.permissionaire.street3 = this.streets[i].name;
            break;
        }
        break;
      }
    }

  }
}


