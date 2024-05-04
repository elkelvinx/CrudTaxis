import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../tools/table/models/table-config';
import { TableAction } from '../../tools/table/models/table-actions';
import { TableActionExtraData } from '../../../components/tools/tableExtraData/models/table-actions'
import { TableColumnsStructure } from '../../../models/extraData';
import { structureData } from '../../../models/extraData';
import { ReadService } from '../../../services/crudDataArray/extra-Read.service';
import { structureStreet } from '../../../models/extraData';
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

  public settlements: structureData[] = [];
  public settlementName: string[] = [];
  public streets: structureStreet[] = [];
  public streetName: string[] = [];
  public models: structureStreet[] = [];
  public modelName: string[] = [];
  public brands: structureData[] = [];
  public brandName: string[] = [];
  public insurers: structureData[] = [];
  public insurerName: string[] = [];
  public relationships: structureData[] = [];
  public relationshipsName: string[] = [];
  public status: structureData[] = [];
  public statusName: string[] = [];
  public typeSinister: structureData[] = [];
  public typeSinisterName: string[] = [];

  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };
  onTableAction(tableAction: TableActionExtraData) {
    debugger;
    switch (tableAction.numIndicator) {
      case 1:
        this.consultarSettleName();
        break;
      case 2:
        this.consultarStreetName();
        break;
      case 3:
        this.consultarBrandName();
        break;
      case 4:
        this.consultarModelName();
        break;
      case 5:
        this.consultarRelationshipsName();
        break;
      case 6:
        this.consultarStatusName();
        break;
      case 7:
        this.consultarTypeSinisterName();
        break;
      case 8:
        this.consultarInsurersName();
        break;
    }
  }
  constructor(private readService: ReadService) { }
  ngOnInit(): void {
    this.consultarSettleName();
    this.consultarStreetName();
    this.consultarModelName();
    this.consultarBrandName();
    this.consultarInsurersName();
    this.consultarRelationshipsName();
    this.consultarStatusName();
    this.consultarTypeSinisterName();
  }
  consultarSettleName() {
    this.readService.consultarSettlementName('n').subscribe(
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
    this.readService.consultarStreets().subscribe(
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
    this.readService.consultarModelsName().subscribe(
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
    this.readService.consultarBrandsName().subscribe(
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
    this.readService.consultarInsuranceName().subscribe(
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
    this.readService.consultarRelations().subscribe(
      (data: any[]) => {
        this.relationships = data;
        this.relationshipsName = this.relationships.map(relationships => relationships.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarStatusName() {
    this.readService.consultarStatus().subscribe(
      (data: any[]) => {
        this.status = data;
        this.statusName = this.status.map(status => status.name);
      },
      error => {
        console.log(error);
      }
    )
  }
  consultarTypeSinisterName() {
    this.readService.consultarTypeSinister().subscribe(
      (data: any[]) => {
        this.typeSinister = data;
        this.typeSinisterName = this.typeSinister.map(typeSinister => typeSinister.name);
      },
      error => {
        console.log(error);
      }
    )
  }
}
