import { HomeService } from '../../../services/home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DatePickerHomeComponent } from '../date-picker-home/date-picker-home.component';
@Component({
  selector: 'app-graphs',
  standalone: false,
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent {
  driversKpi: any | null = null;
  sinistersKpi: any | null = null;
  kpiCards: any[] = [];
  constructor(private homeService: HomeService) { }

 ngOnInit() {
    // Cargar ambos KPIs en paralelo y solo entonces armar los cards
    forkJoin({
      drivers: this.homeService.getDriversKpi(),
      sinisters: this.homeService.getSinistersKpi()
    }).subscribe(({ drivers, sinisters }) => {
      this.driversKpi = drivers;
      this.sinistersKpi = sinisters;

      this.kpiCards = [
        {
          title: 'Conductores',
          icon: 'person',
          value: drivers?.CurrentMonth ?? 0,
          previous: drivers?.PreviousMonth ?? 0,
          percentage: drivers?.Percentage ?? 0
        },
        {
          title: 'Siniestros',
          icon: 'local_hospital',
          value: sinisters?.CurrentMonth ?? 0,
          previous: sinisters?.PreviousMonth ?? 0,
          percentage: sinisters?.Percentage ?? 0
        }
      ];
    }, err => {
      console.error('Error cargando KPIs', err);
    });
  }
}