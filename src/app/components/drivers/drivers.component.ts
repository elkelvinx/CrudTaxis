//aqui agregue las dos ultimas librerias para el autocomplete
import { Component, OnInit } from '@angular/core';
import { ServicesDriversService } from '../../services/services-drivers.service';
import { AppComponent } from '../../app.component';
import { driver } from '../../models/driver';
import { TableColumnsStructure } from '../../models/driver';
import { ReadService } from '../../services/crudDataArray/extra-Read.service';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableAction } from '../tools/table/models/table-actions';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
})
export class DriversComponent implements OnInit {
  // tableColumns: TableColumn[] = [];
  public tableColumns = new TableColumnsStructure(2);
  public Driver = new driver();
  //arreglos que se va a llenar con datos, voy a ver si los puedo comprimir
  public listDriver: driver[] = [];
  public settlements: any[] = [];
  public streets: any[] = [];
  public admins: any[] = [];
  public listStatus: any[] = [];

  public adminsName: any[] = [];
  public settlementName: any[] = [];
  public streetName: any[] = [];
  public statusName: any[] = [];
  public ActSave: boolean = true;

  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };

  constructor(
    private serviciosDriver: ServicesDriversService,
    private AppComponent: AppComponent,
    private servicioApp: ReadService,
  ) { }

  ngOnInit(): void {
    this.consultarStatusName();
    this.consultarDriver(0);
    this.consultarDrivers();
  }

  onDelete(object: driver) {
    this.eliminarDialog(object.id);
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.consultarDriver(tableAction.row.id);
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
        //cambio del flag para que se muestre el html
        if (this.Driver.settlementS == null) {
          // this.isLoadedSt = false;
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
        if (this.Driver.street1 == null) {
          // this.isLoadedSt = true;
        }
        else {
          // console.log('PEDRO PICAPIEDRA')
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarAdminName() {
    this.servicioApp.consultarAdminName('n').subscribe(
      (data: any[]) => {
        this.admins = data;
        this.adminsName = this.admins.map(admins => admins.name);
        //falta verificar que si es 0 se muestre para poder seleccionar
        if (this.Driver.idAdmin !== null) {
          // this.isLoaded2 = true;
        }
        else {
          console.log('que pendejo falla admin')
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarStatusName() {
    this.servicioApp.consultarStatus().subscribe(
      (data: any[]) => {
        this.listStatus = data;
        this.statusName = this.listStatus.map(status => status.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  searchDriver() {
    this.consultarDriver(this.Driver.id);
  }
  consultarDriver(idDriver: any) {

    this.serviciosDriver.consultarDriverId(idDriver).subscribe(
      (data: any) => {
        this.Driver = data;
        //cosas para dar formato a las fechas
        this.Driver.birthS = this.AppComponent.formatBirth(this.Driver.birth);
        this.Driver.licenseExS = this.AppComponent.formatLicense(this.Driver.licenseEx);
        //Actualiza los valores de los dropdowns       
        this.consultarSettleName();
        this.consultarStreetName();
        this.consultarAdminName();
        this.consultarSettleName();
        if (this.Driver.id != 0) {
          this.ActSave = false;
        }
        else {
          // console.log('colonia: ' + this.isLoaded2 + ' calle: ' + this.isLoadedSt)
          this.Driver.licenseEx = this.Driver.birth = this.Driver.hireDate = this.Driver.lastModD = new Date();
          this.Driver.statusS = 'Escoja un status';
          console.log(this.statusName)
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarDrivers() {
    this.serviciosDriver.consultarDrivers().subscribe(
      (data: any[]) => {
        this.listDriver = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  public grabar() {
    this.serviciosDriver.Grabar(this.Driver).subscribe(
      (data) => {
        console.log("Guardado correctamente" + data)
        this.consultarDrivers();
      },
      error => {
        console.log(error);
      }
    )
  }
  public actualizar() {
    this.serviciosDriver.Actualizar(this.Driver).subscribe(
      (data) => {
        console.log("Actualizado correctamente" + data)
        this.consultarDrivers();
      },
      error => {
        console.log(error);
      }
    )
  }
  public eliminar() {
    this.serviciosDriver.Eliminar(this.Driver.id).subscribe(
      (data) => {
        console.log("Eliminado correctamente" + data)
        this.consultarDrivers();
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
  public guardarDireccion(event: Event) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.settlements.length; i++) {
      if (this.settlements[i].name == event) {
        this.Driver.settlement = this.settlements[i].id;
        break;
      }
    }
  }
  public guardarStreet(event: Event, op: number) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.streets.length; i++) {
      if (this.streets[i].name == event) {
        switch (op) {
          case 1:
            this.Driver.st1 = this.streets[i].id;
            this.Driver.street1 = this.streets[i].name;
            break;
          case 2:
            this.Driver.st2 = this.streets[i].id;
            this.Driver.street2 = this.streets[i].name;
            break;
          case 3:
            this.Driver.st3 = this.streets[i].id;
            this.Driver.street3 = this.streets[i].name;
            break;
        }
        break;
      }
    }

  }
  public guardarAdmin(event: Event) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.admins.length; i++) {
      if (this.admins[i].name == event) {
        this.Driver.idAdmin = this.admins[i].id;
        break;
      }
    }
  }
  public guardarStatus(event: Event) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.listStatus.length; i++) {
      if (this.listStatus[i].name == event) {
        this.Driver.status = this.listStatus[i].id;
        break;
      }
    }
  }
  public eliminarDialog(id: number) {
    debugger;
    this.serviciosDriver.Eliminar(id).subscribe(
      (data) => {
        console.log("Eliminado correctamente")
        this.consultarDrivers();
      },
      error => {
        console.log(error);
      }
    )
  }
}
