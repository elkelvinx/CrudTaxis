import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/services-units.service';
import { AppComponent } from '../../app.component';
import { Unit2 } from '../../models/unit';
import { TableConfig } from '../tools/table/models/table-config';
import { TABLE_ACTION } from '../tools/table/enums/action.enum';
import { TableAction } from '../tools/table/models/table-actions';

import { ReadService } from '../../services/crudDataArray/extra-Read.service';
import { TableColumn } from '../tools/table/models/table-column';
import { ExtraDataService } from '../tools/car_auto-complete/services/extra-data.service';
import { NotificationService } from '../tools/info-dialog/notification.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {
  private isloading = false; // ✅ Bandera para prevenir múltiples peticiones
  tableColumns: TableColumn[] = [];

  units = new Unit2();
  listUnits: Unit2[] = [];

  public admins: any[] = [];
  public brands: any[] = [];
  public models: any[] = [];

  public adminsName: any[] = [];
  public brandsName: any[] = [];
  public modelsName: { id: any; idBrand: any; name: any }[] = [];// En tu componente.ts

  public loadAd: boolean = false;
  public loadBr: boolean = false;
  public loadMd: boolean = false;
  public loadT: boolean = false;

  public ActSave: boolean = true;

  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };

  constructor(
    private serviceUnit: UnitsService,
    private AppComponent: AppComponent,
    private servicioApp: ReadService,
    private number: ExtraDataService,
    private notificationService: NotificationService // ✅ Asegurar que está inyectado
  ) { }

  ngOnInit() {
    this.setTableColumns();
    this.loadAllData();

  }
  async loadAllData() {
    try {
      await Promise.all([
        this.consultarUnits(),
        this.consultarAdminName(),
        this.consultarBrandName(),
        this.consultarModelName()
      ]);
      this.consultarUnit(0);
    } catch (error) {
      console.error('Error loading data:', error);
      this.notificationService.error('Error al cargar los datos');
    }
  }
  public setTableColumns() {
    this.tableColumns = [
      { label: 'Numero', def: 'ecoNumber', dataKey: 'ecoNumber' },
      { label: 'Administrador', def: 'adminName', dataKey: 'adminName' },
      { label: 'Año', def: 'yearModel', dataKey: 'yearModel' },
      { label: 'Vencimiento del seguro', def: 'expInsurance', dataKey: 'expInsurance', dataType: 'date', formatt: 'dd MMM yyyy' },
      { label: 'Modelo', def: 'modelName', dataKey: 'modelName' },
      { label: 'Marca', def: 'brandName', dataKey: 'brandName' },
      // { label: 'Color del carro', def: 'color', dataKey: 'color' },
      // { label: 'Serie', def: 'serie', dataKey: 'serie' },
    ]
  }
  onDelete(customer: Unit2) {
    console.log('Delete', customer);
  }
  onSelect(data: any) {
    console.log(data);
  }
  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.consultarUnit(tableAction.row.id);
        break;

      case TABLE_ACTION.DELETE:
        this.onDelete(tableAction.row);
        break;

      default:
        break;
    }
  }

  public consultarUnits() {
    if (this.isloading) return; // ✅ Prevenir múltiples llamadas
    this.isloading = true;
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
    this.consultarModelName();
    this.loadAllData();
  }
  searchDriver() {
    this.consultarUnit(this.units.id);
  }
  consultarUnit(idUnit: any) {
    this.serviceUnit.consularUnit(idUnit).subscribe(
      (data: any) => {
        this.units = data;
        this.notificationService.successInfo("Unidad cargada");
        if (this.units.id !== 0)
          this.ActSave = false;
        else {
          this.units.expInsurance = this.units.lastModDate = this.units.registerDate = new Date();
          this.units.color = '#FFFFFF'
          this.ActSave = true;
        }
        // debugger
        this.number.selectedBrandId = this.units.idBrand;
        // console.log(this.number.selectedBrandId + " IDbrand general");
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al cargar la unidad", errorMessage);
      }
    )
  }

  public grabar() {
    debugger
    if (this.ActSave === true && this.units.id == 0) {
      this.serviceUnit.Grabar(this.units).subscribe(
        (data) => {
          debugger
          this.notificationService.success("El Siniestro ha sido guardado");
          this.consultarUnits();
        },
        error => {
          const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
          this.notificationService.displayMessageError("Error al guardar la unidad", errorMessage);
        }
      )

    }
    else console.log("No se puede guardar");
  }
  public actualizar() {
    console.log(this.units.id + " ACTUALIZANDO " + this.units.expInsurance);
    if (this.ActSave === false) {      
      this.serviceUnit.Actualizar(this.units).subscribe(
        (data) => {
          this.notificationService.success("El Siniestro ha sido actualizado");
          this.consultarUnits();
        },
        error => {
          const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
          this.notificationService.displayMessageError("Error al actualizar la unidad", errorMessage);
        }
      )
    }
  }
  public eliminar() {
    this.serviceUnit.Eliminar(this.units.id).subscribe(
      (data) => {
        this.notificationService.success("El Siniestro ha sido eliminado");
        this.consultarUnits();
      },
      error => {
        const errorMessage = error.error.ExceptionMessage || "Error desconocido, posiblemente falla de la API o BD";
        this.notificationService.displayMessageError("Error al eliminar la unidad", errorMessage);
      }
    )
  }
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
        // if (this.units.brandName !== null)
        //   this.loadBr = true;
      },
      error => {
        console.log(error);
        this.notificationService.error('Error al cargar marcas');
      }
    )
  }
  consultarModelName() {
    this.servicioApp.consultarModelsName().subscribe(
      (data: any[]) => {
        this.models = data;
        this.modelsName = this.models.map(models => ({
          id: models.id,
          name: models.name,
          idBrand: models.idBrand
        }));
        this.number.models = this.models;
        // if (this.units.modelName !== null)
        //   this.loadMd = true;
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
        this.units.admin = idFinal;
        break;
      case 'brand':
        idFinal = this.AppComponent.changeAutocomplete(event, this.brands);
        break;
      case 'model':
        idFinal = this.AppComponent.changeAutocomplete(event, this.models);
        this.units.model = idFinal;
        debugger
        break;
    }
    // console.log("El valor es " + idFinal);
  }
}
