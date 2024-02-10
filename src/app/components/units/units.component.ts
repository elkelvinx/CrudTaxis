import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/services-units.service';
import { AppComponent } from '../../app.component';
import { unit } from '../../models/unit';
import { Unit2 } from '../../models/unit';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../../services/services-app.service';
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {
  units = new Unit2();
  listUnits: Unit2[] = [];
  public settlements: any[] = [];
  public streets: any[] = [];

  public settlementName: any[] = [];
  public streetName: any[] = [];

  constructor(
    private serviceUnit: UnitsService,
    private AppComponent: AppComponent,
    private servicioApp: AppService
  ) { }

  ngOnInit() {
    this.consultarUnits();
    this.consultarStreetName();
  }
  public consultarUnits() {
    this.serviceUnit.consularUnits().subscribe(
      (data: any) => {
        this.listUnits = data;
        console.log(this.listUnits);
      },
      error => {
        console.log(error);
      }
    )
  }
  searchDriver() {
    this.consultarUnit(this.units.id);
  }
  consultarUnit(idUnit: any) {
    // this.isLoadedSt = true;
    this.serviceUnit.consularUnit(idUnit).subscribe(
      (data: any) => {
        this.units = data;
        //console.log(this.units.ecoNumber + " " + this.units.id + " " + this.units.registerDate);
        debugger
        //cosas para dar formato a las fechas
        // this.units.expInsurance = this.AppComponent.formatBirth(this.units.expInsurance);
        // this.units.lastModDate = this.AppComponent.formatLicense(this.units.lastModDate);
        //Actualiza los valores de los dropdowns       
        // this.consultarSettleName();
        // this.consultarStreetName();
        // this.consultarAdminName();
      },
      error => {
        console.log(error);
      }
    )
  }

  // public grabar() {
  //   this.serviceUnit.Grabar(this.Driver).subscribe(
  //     (data) => {
  //       console.log("Guardado correctamente")
  //       this.consultarDrivers();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   debugger;
  // }





  consultarStreetName() {
    this.servicioApp.consultarStreetName('n').subscribe(
      (data: any[]) => {
        this.streets = data;
        this.streetName = this.streets.map(streets => streets.name);
        // if (this.Driver.street1 == null) {
        //   this.isLoadedSt = true;
        // }
        // else {
        //   console.log('PEDRO PICAPIEDRA')
        // }
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
        // //cambio del flag para que se muestre el html
        // if (this.Driver.settlementS == null) {
        //   this.isLoadedSt = false;
        // }
        // else {
        //   //aqui deberia hacer algo jasjasjs
        // }
      },
      error => {
        console.log(error);
      }
    )

  }
}
