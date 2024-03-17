//aqui agregue las dos ultimas librerias para el autocomplete
import { Component, OnInit } from '@angular/core';
import { ServicesDriversService } from '../../services/services-drivers.service';
import { AppComponent } from '../../app.component';
import { driver } from '../../models/driver';
import { TableColumnsStructure } from '../../models/driver';
import { AppService } from '../../services/services-app.service';
import { YesNoDialogComponent } from '../tools/yes-no-dialog/yes-no-dialog.component';
import { TableConfig } from '../tools/table/models/table-config';
import { TableColumn } from '../tools/table/models/table-column';
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

  public adminsName: any[] = [];
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

  constructor(
    private serviciosDriver: ServicesDriversService,
    private AppComponent: AppComponent,
    private servicioApp: AppService,
  ) { }

  ngOnInit(): void {
    this.consultarDriver(0);
    this.consultarDrivers();
    // this.setTableColumns(2);
  }
  // public setTableColumns(numberOfColumns: number = 1) {
  //   switch (numberOfColumns) {
  //     case 1:
  //       this.tableColumns = [
  //         { label: 'Nombres', def: 'name', dataKey: 'name' },
  //         { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
  //         { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
  //         { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
  //         { label: 'Administrador', def: 'adminName', dataKey: 'adminName' },
  //         { label: 'Vencimiento licencia', def: 'licenseEx', dataKey: 'licenseEx', dataType: 'date', formatt: 'dd MMM yyyy' },
  //         { label: 'Fecha nacimiento', def: 'birth', dataKey: 'birth', dataType: 'date', formatt: 'dd MMM yyyy' },
  //         { label: 'Fecha de ingreso', def: 'hireDate', dataKey: 'hireDate', dataType: 'date', formatt: 'dd MMM yyyy' },
  //         { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
  //         { label: 'Calle', def: 'street1', dataKey: 'street1' },
  //         { label: 'Pago ingreso', def: 'ingressPay', dataKey: 'ingressPay' },
  //       ]
  //       break;
  //     case 2:
  //       this.tableColumns = [
  //         { label: 'Nombres', def: 'name', dataKey: 'name' },
  //         { label: 'Apellido paterno', def: 'lm1', dataKey: 'lm1' },
  //         { label: 'Apellido materno', def: 'lm2', dataKey: 'lm2' },
  //         { label: 'Numero de telefono', def: 'phone', dataKey: 'phone' },
  //         { label: 'Administrador', def: 'adminName', dataKey: 'adminName' },
  //         { label: 'Vencimiento licencia', def: 'licenseEx', dataKey: 'licenseEx', dataType: 'date', formatt: 'dd MMM yyyy' },
  //         { label: 'Fecha de ingreso', def: 'hireDate', dataKey: 'hireDate', dataType: 'date', formatt: 'dd MMM yyyy' },
  //         { label: 'Colonia', def: 'settlementS', dataKey: 'settlementS' },
  //       ]
  //       break;
  //   }
  // }
  onDelete(customer: driver) {
    console.log('Delete', customer);
  }
  onSelect(data: any) {
    console.log(data);
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
        if (this.Driver.street1 == null) {
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
  consultarAdminName() {
    this.servicioApp.consultarAdminName('n').subscribe(
      (data: any[]) => {
        this.admins = data;
        this.adminsName = this.admins.map(admins => admins.name);
        //falta verificar que si es 0 se muestre para poder seleccionar
        if (this.Driver.idAdmin !== null) {
          this.isLoaded2 = true;
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
  searchDriver() {
    this.consultarDriver(this.Driver.id);
  }
  consultarDriver(idDriver: any) {
    this.isLoadedSt = true;
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
        if (this.Driver.id != 0) {
          this.ActSave = false;
        }
        else {
          console.log('colonia: ' + this.isLoaded2 + ' calle: ' + this.isLoadedSt)
          this.Driver.licenseEx = this.Driver.birth = this.Driver.hireDate = this.Driver.lastModD = new Date();
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
        this.loadT = true;
      },
      error => {
        console.log(error);
      }
    )
  }
  public grabar() {
    this.serviciosDriver.Grabar(this.Driver).subscribe(
      (data) => {
        console.log("Guardado correctamente")
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
        console.log("Actualizado correctamente")
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
        console.log("Eliminado correctamente")
        this.consultarDrivers();
        console.log(data)
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
        this.Driver.settlement = this.settlements[i].id;
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
}
