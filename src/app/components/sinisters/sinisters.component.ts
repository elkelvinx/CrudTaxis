import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableAction } from '../tools/table/models/table-actions';

import { AppService } from '../../services/services-app.service';
import { TableColumn } from '../tools/table/models/table-column';
import { ExtraDataService } from '../tools/car_auto-complete/services/extra-data.service';
import { sinister } from '../../models/sinister';
import { SinisterService } from '../../services/sinister.service';
import { sinisterData } from '../../models/sinister';
@Component({
  selector: 'app-sinisters',
  templateUrl: './sinisters.component.html',
  styleUrl: './sinisters.component.css'
})
export class SinistersComponent {
public sinister = new sinister();
public listSinisters: sinister[] = [];

public arrays = new sinisterData();
public settlements: any[] = [];
public streets: any[] = [];
public admins: any[] = [];
public drivers: any[] = [];

public driverName: any[] = [];
public adminsName: any[] = [];
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
    private serviceSinister: SinisterService,
    private number: ExtraDataService,
  ) { }
  searchDriver() {
    
    this.consultarSinister(this.sinister.id);
  }
  consultarSinister(idDriver: any) {
    this.serviceSinister.consultarSinisterId(idDriver).subscribe(
      (data: any) => {
        this.sinister = data;       
        // if (this.Driver.id != 0) {
        //   this.ActSave = false;
        // }
        // else {
        //   // console.log('colonia: ' + this.isLoaded2 + ' calle: ' + this.isLoadedSt)
        //   this.Driver.licenseEx = this.Driver.birth = this.Driver.hireDate = this.Driver.lastModD = new Date();
        //   this.Driver.statusS = 'Escoja un status';
        //   console.log(this.statusName)
        // }
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
  grabar() {
  }
  actualizar() {
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
  onDelete(object: sinister) {
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
}
