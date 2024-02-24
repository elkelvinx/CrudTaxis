//aqui agregue las dos ultimas librerias para el autocomplete
import { Component, OnInit } from '@angular/core';
import { ServicesDriversService } from '../../services/services-drivers.service';
import { AppComponent } from '../../app.component';
import { driver } from '../../models/driver';
import { AppService } from '../../services/services-app.service';
import { YesNoDialogComponent } from '../tools/yes-no-dialog/yes-no-dialog.component';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',

})
export class DriversComponent implements OnInit {
  public Driver = new driver();
  //fechaNacimiento: Date;
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

  constructor(
    private serviciosDriver: ServicesDriversService,
    private AppComponent: AppComponent,
    private servicioApp: AppService,
  ) { }

  ngOnInit(): void {
    // this.fechaNacimiento = new Date();
    this.consultarDriver(0);
    this.consultarDrivers();
    console.log(this.isLoaded2)
    console.log(this.isLoadedSt)
  }
  ngAfterViewInit() {
    //this.consultarSettleName();
    //this.consultarStreetName();
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
        console.log("Guardado correctamente")
        this.consultarDrivers();
      },
      error => {
        console.log(error);
      }
    )
    debugger;
  }
  public actualizar() {


    this.serviciosDriver.Actualizar(this.Driver).subscribe(
      (data) => {
        console.log("Actualizado correctamente")
        this.consultarDrivers();
        debugger;
      },
      error => {
        console.log(error);
      }
    )
    debugger;
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
    console.log(event + "y el valor es ");
    for (let i = 0; i < this.admins.length; i++) {
      if (this.admins[i].name == event) {
        this.Driver.idAdmin = this.admins[i].id;

        break;
      }
    }

  }
}
