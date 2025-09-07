import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableAction } from '../tools/table/models/table-actions';
import { Sinister } from '../../models/sinister';
import { SinisterService } from '../../services/sinister.service';
import { sinisterData } from '../../models/sinister';
import { TableColumnsStructure } from '../../models/sinister';
import { SERVICE_TOKEN, PRUEBAService, IGenericService } from '../../services/cud_ZIP.service';
import { ReadService } from '../../services/crudDataArray/extra-Read.service';
import { NotificationService } from "../tools/info-dialog/notification.service";
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-sinisters',
  templateUrl: './sinisters.component.html',
  styleUrl: './sinisters.component.css',
  providers: [{ provide: SERVICE_TOKEN, useClass: SinisterService }]

})
export class SinistersComponent implements OnInit {
  //public sinister = new Sinister();
  public sinister: Sinister = new Sinister();
  public listSinisters: Sinister[] = [];
  public tableColumns = new TableColumnsStructure(1);
  //! ESTA FALLANDO ESTE service public service: IGenericService<Sinister>;   


  public arrays = new sinisterData();
  public settlements: any[] = [];
  public streets: any[] = [];
  public admins: any[] = [];
  public drivers: any[] = [];
  public insurances: any[] = [];
  public typeSinister: any[] = [];

  public driverName: any[] = [];
  public adminsName: any[] = [];
  public settlementName: any[] = [];
  public streetName: any[] = [];
  public insuranceName: any[] = [];
  public typeSinisterName: any[] = [];
  public ActSave: boolean = true;



  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };

  constructor(
    private serviceSinister: SinisterService,
    private pruebaService: PRUEBAService<Sinister>,
    private servicioApp: ReadService,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.consultarSettleName();
    this.consultarStreetName();
    this.consultarAdminName();
    this.consultarDriverName();
    this.consultarInsuranceName();
    this.consultarTypeSinister();

    this.consultarSinisters();
    this.consultarSinister(0);
  }
  //BORRAR
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
  consultarAdminName() {
    this.servicioApp.consultarAdminsName().subscribe(
      (data: any[]) => {
        this.admins = data;
        this.adminsName = this.admins.map(admins => admins.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarDriverName() {
    this.servicioApp.consultarDriverName().subscribe(
      (data: any[]) => {
        this.drivers = data;
        this.driverName = this.drivers.map(driver => driver.name);
        console.log(this.drivers);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarInsuranceName() {
    this.servicioApp.consultarInsuranceName().subscribe(
      (data: any[]) => {
        this.insurances = data;
        this.insuranceName = this.insurances.map(insurers => insurers.name);
        console.log(this.insuranceName);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarTypeSinister() {
    this.servicioApp.consultarTypeSinister().subscribe(
      (data: any[]) => {
        this.typeSinister = data;
        this.typeSinisterName = this.typeSinister.map(typeSinister => typeSinister.name);
        console.log(this.typeSinisterName);
      },
      error => {
        console.log(error);
      }
    )
  }
  //
  searchDriver() {
    this.consultarSinister(this.sinister.id);
  }
  formatearInput() {
    this.sinister.resetProperties();
  }
  consultarSinister(idDriver: any) {
    this.serviceSinister.consultarSinisterId(idDriver).subscribe(
      (data: any) => {
        this.sinister = data;
        if (this.sinister.id != 0) {
          this.ActSave = false;
          this.sinister.dateEvent = new Date(this.sinister.dateEvent);
          this.notificationService.successInfo("Siniestro cargado");
        } else {
          this.sinister.dateEvent = new Date();
          this.ActSave = true;
        }
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al cargar el siniestro", errorMessage);
      }
    )
  }
  consultarSinisters() {
    this.serviceSinister.consultarSinister().subscribe(
      (data: any[]) => {
        this.listSinisters = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  public grabar() {
    // Print the current sinister object as JSON for API testing
    console.log('Sinister payload for API:', JSON.stringify(this.sinister, null, 2));
    console.log(this.sinister);
    this.serviceSinister.Grabar(this.sinister).subscribe(
      (data) => {
        console.log(data);
        this.notificationService.success("El Siniestro ha sido guardado");
        this.consultarSinisters();
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al guardar el siniestro", errorMessage);
      }
    )
  }

  public actualizar() {
    // Print the current sinister object as JSON for API testing
    console.log('Sinister payload for API:', JSON.stringify(this.sinister, null, 2));
    console.log(this.sinister);
    this.serviceSinister.Actualizar(this.sinister).subscribe(
      (data) => {
        this.notificationService.success("El Siniestro ha sido actualizado");
        this.consultarSinisters();
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al actualizar el siniestro", errorMessage);
      }
    )
  }

  public eliminar() {
    this.serviceSinister.Eliminar(this.sinister.id).subscribe(
      (data) => {
        this.notificationService.success("El Siniestro ha sido eliminado");
        this.consultarSinisters();
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al eliminar el siniestro", errorMessage);
      }
    )
  }

  public guardarStreets(event: Event, op: number) {
    this.pruebaService.guardarStreet(event, op, this.streets);
  }
  public guardarStreet(event: Event, op: number) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.streets.length; i++) {
      if (this.streets[i].name == event) {
        switch (op) {
          case 1:
            this.sinister.st1 = this.streets[i].id;
            this.sinister.street1 = this.streets[i].name;
            break;
          case 2:
            this.sinister.st2 = this.streets[i].id;
            this.sinister.street2 = this.streets[i].name;
            break;
          case 3:
            this.sinister.st3 = this.streets[i].id;
            this.sinister.street3 = this.streets[i].name;
            break;
        }
        break;
      }
    }
  }
  // pone el id de la colonia
  public guardarDireccion(event: Event) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.settlements.length; i++) {
      if (this.settlements[i].name == event) {
        this.sinister.settlement = this.settlements[i].id;
        break;
      }
    }
  }
  public guardarAdmin(event: Event) {
    // console.log(event + "y el valor es ");
    for (let i = 0; i < this.admins.length; i++) {
      if (this.admins[i].name == event) {
        this.sinister.admin = this.admins[i].id;
        break;
      }
    }
  }
 
  onDelete(object: Sinister) {
    this.eliminarDialog(object.id);
  }
  public eliminarDialog(id: number) {
    debugger;
    this.serviceSinister.Eliminar(id).subscribe(
      (data) => {
        console.log("Eliminado correctamente")
        this.consultarSinisters();
      },
      error => {
        console.log(error);
      }
    )
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.consultarSinister(tableAction.row.id);
        break;

      case TABLE_ACTION.DELETE:
        this.onDelete(tableAction.row);
        break;
      default:
        break;
    }
  }
}

