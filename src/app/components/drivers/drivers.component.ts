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
import { NotificationService } from "../tools/info-dialog/notification.service";
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
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.consultarStatusName();
    this.consultarDriver(0);
    this.consultarDrivers();
  }

  onDelete(object: driver) {
    debugger
    this.eliminarDialog(object.id);
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.notificationService.successInfo("Driver Cargado");
        this.consultarDriver(tableAction.row.id);
        break;

      case TABLE_ACTION.DELETE:
        debugger
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  }

  get nombreCompleto(): string {
    const nombre = this.Driver.name || '';
    const apellido1 = this.Driver.lm1 || '';
    const apellido2 = this.Driver.lm2 || '';

    if (nombre || apellido1 || apellido2) {
      return `${nombre} ${apellido1} ${apellido2}`;
    } else {
      // Todos los valores están vacíos
      return 'con nombre no especificado';
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
        const errorMessage = error.error.ExceptionMessage || "Error Relacionado a la BD"; // Accede al mensaje de error
        this.notificationService.displayMessageError("Error al guardar el registro", errorMessage);
      }
    )
  }
  consultarAdminName() {
    this.servicioApp.consultarAdminName('n').subscribe(
      (data: any[]) => {
        this.admins = data;
        this.adminsName = this.admins.map(admins => admins.name);
        if (this.Driver.admin !== null) {
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
        const errorMessage = error.error.ExceptionMessage || "Error Relacionado a la BD"; 
        this.notificationService.displayMessageError("Error al guardar el registro", errorMessage);
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
          this.ActSave = true;
          this.Driver.licenseEx = this.Driver.hireDate = this.Driver.lastModD = new Date();
          this.Driver.birth = new Date('1900-01-01');
          this.Driver.statusS = 'Escoja un status';
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
    debugger
    this.serviciosDriver.Grabar(this.Driver).subscribe(
      (data) => {
        debugger
        this.notificationService.success("El Conductor ha sido guardado"+ data);
        this.consultarDrivers();
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido"; // Accede al mensaje de error
        this.notificationService.displayMessageError("Error al guardar el registro", errorMessage);
      }
    )
  }
  
  public actualizar() {
    debugger
    this.serviciosDriver.Actualizar(this.Driver).subscribe(
      (data) => {
        console.log("Actualizado correctamente" + data)
        this.notificationService.success("El Conductor ha sido actualizado");
        this.consultarDrivers();
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al actualizar el registro",errorMessage);
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
        this.notificationService.displayMessageError("Error al guardar el registro",error);
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
    debugger
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.admins.length; i++) {
      if (this.admins[i].name == event) {
        this.Driver.admin = this.admins[i].id;
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
