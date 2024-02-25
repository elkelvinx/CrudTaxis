import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/services-units.service';
import { AppComponent } from '../../app.component';
import { unit } from '../../models/unit';
import { Unit2 } from '../../models/unit';
import { TableConfig } from '../tools/table/models/table-config';

import { AppService } from '../../services/services-app.service';
import { TableColumn } from '../tools/table/models/table-column';
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {
  tableColumns: TableColumn[] = [];

  units = new Unit2();
  listUnits: Unit2[] = [];

  public admins: any[] = [];
  public brands: any[] = [];
  public models: any[] = [];

  public adminsName: any[] = [];
  public brandsName: any[] = [];
  public modelsName: any[] = [];

  public loadAd: boolean = false;
  public loadBr: boolean = false;
  public loadMd: boolean = false;
  public loadT: boolean = false;

  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };

  constructor(
    private serviceUnit: UnitsService,
    private AppComponent: AppComponent,
    private servicioApp: AppService
  ) { }

  ngOnInit() {
    this.consultarUnits();
    this.consultarUnit(1);
    this.setTableColumns();

  }
  public setTableColumns() {
    this.tableColumns = [
      { label: 'Numero Economico', def: 'ecoNumber', dataKey: 'ecoNumber' },
      { label: 'administrador', def: 'adminName', dataKey: 'adminName' },
      { label: 'año del modelo', def: 'yearModel', dataKey: 'yearModel' },
      { label: 'serie', def: 'serie', dataKey: 'serie' },
      { label: 'Vencimiento del seguro', def: 'expInsurance', dataKey: 'expInsurance' },
      { label: 'color del carro', def: 'color', dataKey: 'color' },
      { label: 'Modelo', def: 'modelName', dataKey: 'modelName' },
      { label: 'Marca', def: 'brandName', dataKey: 'brandName' },
      { label: 'actions', def: 'actions', dataKey: 'actions' },
    ]
  }
  public consultarUnits() {
    this.serviceUnit.consularUnits().subscribe(
      (data: any) => {
        this.listUnits = data;
        // console.log(this.units + " este")
        this.loadT = true;
      },
      error => {
        console.log(error);
      }
    )
    this.consultarAdminName();
    this.consultarBrandName();
    this.consultarModelName();


  }
  searchDriver() {
    this.consultarUnit(this.units.id);
  }
  consultarUnit(idUnit: any) {
    this.serviceUnit.consularUnit(idUnit).subscribe(
      (data: any) => {
        this.units = data;

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
  consultarAdminName() {
    this.servicioApp.consultarAdminsName().subscribe(
      (data: any[]) => {
        this.admins = data;
        this.adminsName = this.admins.map(admins => admins.name);
        if (this.units.adminName !== null)
          this.loadAd = true;
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarBrandName() {
    this.servicioApp.consultarBrandsName().subscribe(
      (data: any[]) => {
        this.brands = data;
        this.brandsName = this.brands.map(brands => brands.name);
        //cambio del flag para que se muestre el html
        if (this.units.brandName !== null)
          this.loadBr = true;
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarModelName() {
    this.servicioApp.consultarModelsName().subscribe(
      (data: any[]) => {
        this.models = data;
        this.modelsName = this.models.map(models => models.name);
        if (this.units.modelName !== null)
          this.loadMd = true;
      },
      error => {
        console.log(error);
      }
    )
  }
  public changeSelection(event: Event, type: string) {
    let idFinal: number = 0;
    switch (type) {
      case 'admin':
        idFinal = this.AppComponent.changeAutocomplete(event, this.admins);
        break;
      case 'brand':
        idFinal = this.AppComponent.changeAutocomplete(event, this.brands);
        break;
      case 'model':
        idFinal = this.AppComponent.changeAutocomplete(event, this.models);
        break;
    }
    console.log("El valor es " + idFinal);
  }
}
