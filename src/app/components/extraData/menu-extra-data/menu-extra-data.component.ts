import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../tools/table/models/table-config';
import { TableAction } from '../../tools/table/models/table-actions';
import { TableColumnsStructure } from '../../../models/extraData';
import { structureData } from '../../../models/extraData';
import { ReadService } from '../../../services/crudDataArray/extra-Read.service';
import { structureModel } from '../../../models/extraData';
@Component({
  selector: 'app-menu-extra-data',
  templateUrl: './menu-extra-data.component.html',
  styleUrl: './menu-extra-data.component.css'
})
export class MenuExtraDataComponent implements OnInit {
  public tableColumns = new TableColumnsStructure(1);
  public columnsStreet = new TableColumnsStructure(2);
  public columnsModels = new TableColumnsStructure(3);
  public arrays: structureData[] = [];

  public settlements: structureModel[] = [];
  public settlementName: string[] = [];
  public streets: structureData[] = [];
  public streetName: string[] = [];
  public models: structureModel[] = [];
  public modelName: string[] = [];
  public brands: structureModel[] = [];
  public brandName: string[] = [];
  public insurers: structureModel[] = [];
  public insurerName: string[] = [];
  public relationships: structureData[] = [];
  public relationshipsName: string[] = [];

  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };
  onTableAction(tableAction: TableAction) {
  }
  constructor(private servicioApp: ReadService) { }
  ngOnInit(): void {
    this.consultarSettleName();
    this.consultarStreetName();
    this.consultarModelName();
    this.consultarBrandName();
    this.consultarInsurersName();
    this.consultarRelationshipsName();
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
    this.servicioApp.consultarStreets().subscribe(
      (data: any[]) => {
        this.streets = data;
        this.streetName = this.streets.map(streets => streets.name);
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
        this.modelName = this.models.map(models => models.name);
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
        this.brandName = this.brands.map(brands => brands.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarInsurersName() {
    this.servicioApp.consultarInsuranceName().subscribe(
      (data: any[]) => {
        this.insurers = data;
        this.insurerName = this.insurers.map(insurers => insurers.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarRelationshipsName() {
    this.servicioApp.consultarRelations().subscribe(
      (data: any[]) => {
        this.relationships = data;
        this.relationshipsName = this.relationships.map(relationships => relationships.name);
      },
      error => {
        console.log(error);
      }
    )
  }
}
