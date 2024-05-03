import { Component } from '@angular/core';
import { ServicesPermissionaireService } from '../../services/services-permissionaire.service';
import { DatePipe } from '@angular/common';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableColumn } from '../tools/table/models/table-column';
import { permissionaire } from '../../models/permissionaire'
import { TableAction } from '../tools/table/models/table-actions';
import { ReadService } from '../../services/crudDataArray/extra-Read.service';
import { TableColumnsStructure } from '../../models/permissionaire';

@Component({
  selector: 'app-permissionaires',
  templateUrl: './permissionaires.component.html',
  styleUrl: './permissionaires.component.css'
})
export class PermissionairesComponent {
  public tableColumns = new TableColumnsStructure(1);
  public permissionaire = new permissionaire();
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

  public listPermissionaire: any[] = [];
  constructor(
    private datePipe: DatePipe,
    private servicioPermission: ServicesPermissionaireService,
    private servicioApp: ReadService,
  ) { }

  ngOnInit(): void {
    this.consultarPermission(this.permissionaire.id);
    this.consultarPermissions();
  }
  searchPermission() {
    this.consultarPermission(this.permissionaire.id);
  }
  consultarPermission(idPermission: any) {
    this.servicioPermission.consultarPermissionId(idPermission).subscribe(
      (data: any) => {
        this.permissionaire = data;
        this.consultarSettleName();
        this.consultarStreetName();
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
