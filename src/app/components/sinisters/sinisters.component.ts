import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableAction } from '../tools/table/models/table-actions';
import { ExtraDataService } from '../tools/car_auto-complete/services/extra-data.service';
import { Sinister } from '../../models/sinister';
import { SinisterService } from '../../services/sinister.service';
import { sinisterData } from '../../models/sinister';
import { TableColumnsStructure } from '../../models/sinister';
import { SERVICE_TOKEN, PRUEBAService, IGenericService } from '../../services/prueba.service';
import { AppService } from '../../services/services-app.service';

@Component({
  selector: 'app-sinisters',
  templateUrl: './sinisters.component.html',
  styleUrl: './sinisters.component.css',
  providers: [{ provide: SERVICE_TOKEN, useClass: SinisterService }]

})
export class SinistersComponent implements OnInit{
//public sinister = new Sinister();
public sinister: Sinister = new Sinister();
public listSinisters: Sinister[] = [];
public tableColumns = new TableColumnsStructure(1);
public service: IGenericService<Sinister>;


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
    private number: ExtraDataService,
    private pruebaService: PRUEBAService<Sinister>,
    private servicioApp: AppService
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
         
          debugger;
        }
        else {
          this.sinister.dateEvent= new Date();
        }
      },
      error => {
        console.log(error);
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
  /* grabar() {
     this.pruebaService.Grabar('sinister',this.sinister);
  } */ 
  public grabar() {
    this.serviceSinister.Grabar(this.sinister).subscribe(
      (data) => {
        console.log("Guardado correctamente" + data)
        this.consultarSinisters();
      },
      error => {
        console.log(error);
      }
    )
  }
  public actualizar() {
    this.serviceSinister.Actualizar(this.sinister).subscribe(
      (data) => {
        console.log("Actualizado correctamente" + data)
        this.consultarSinisters();
      },
      error => {
        console.log(error);
      }
    )
  }
  public eliminar() {
    this.serviceSinister.Eliminar(this.sinister.id).subscribe(
      (data) => {
        console.log("Eliminado correctamente" + data)
        this.consultarSinisters();
      },
      error => {
        console.log(error);
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

