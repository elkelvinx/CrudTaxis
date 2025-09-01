import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HomeService } from '../../../../services/home.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DatesRange } from '../../../../models/home';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-graph-range',
  standalone: false,
  templateUrl: './graph-range.component.html',
  styleUrl: './graph-range.component.css'
})
export class GraphRangeComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  view: [number, number] = [700, 360];
  data: any[] = [];
 colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal, // use ScaleType enum/value
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 5);
    this.range.setValue({ start, end });
    this.updateView();
    this.loadData(start, end);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateView();
  }

  updateView() {
    try {
      const width = this.chartContainer?.nativeElement?.clientWidth ?? 800;
      const w = Math.max(320, width);
      const h = Math.round(w * 0.45);
      this.view = [w, h];
    } catch { /* ignore */ }
  }

  onRangeChange() {
    const { start, end } = this.range.value;
    if (start && end) {
      // Normalize: primer día / último día (el datepicker ya hará esto si usas el componente modular)
      const s = new Date(start.getFullYear(), start.getMonth(), 1);
      const e = new Date(end.getFullYear(), end.getMonth(), 1);
      this.loadData(s, e);
    }
  }

  private loadData(start: Date, end: Date) {
    // Normaliza ambos a Date, usando el primer día y el último día del mes
    const startDate = new Date(start.getFullYear(), start.getMonth(), 1);
    const endDate = new Date(end.getFullYear(), end.getMonth() + 1, 0); // último día del mes

    const dates: DatesRange = { StartDate: startDate, EndDate: endDate };

    forkJoin({
      drivers: this.homeService.getDriversRange(dates),
      sinisters: this.homeService.getSinistersRange(dates)
    }).subscribe(({ drivers, sinisters }: any) => {
      // Construir meses entre start..end (ordenado + sin duplicados)
      const seriesDrivers: any[] = [];
      const seriesSinisters: any[] = [];
      const cur = new Date(start.getFullYear(), start.getMonth(), 1);
      const last = new Date(end.getFullYear(), end.getMonth(), 1);

      while (cur <= last) {
        const key = cur.getFullYear() * 100 + (cur.getMonth() + 1);
        const label = `${String(cur.getMonth() + 1).padStart(2, '0')}/${cur.getFullYear()}`; // 08/2025

        const d = (drivers || []).find((x: any) => (x.Year * 100 + x.Month) === key);
        const s = (sinisters || []).find((x: any) => (x.Year * 100 + x.Month) === key);

        seriesDrivers.push({ name: label, value: d ? d.Total : 0 });
        seriesSinisters.push({ name: label, value: s ? s.Total : 0 });

        cur.setMonth(cur.getMonth() + 1);
      }

      // Reemplazar la referencia (evita duplicados)
      this.data = [
        { name: 'Conductores', series: seriesDrivers },
        { name: 'Siniestros', series: seriesSinisters }
      ];
      this.updateView();
    }, (error: any) => {
      console.error('Error cargando series', error);
    });
  }
}
// loadData(start: Date, end: Date) {
//   this.dates = { StartDate: start, EndDate: end };
//   Promise.all([
//     this.homeService.getDriversRange(this.dates).toPromise(),
//     this.homeService.getSinistersRange(this.dates).toPromise()
//   ]).then(([drivers, sinisters]) => {
//     this.data = [
//       {
//         name: 'Drivers',
//         series: drivers.map((d: any) => ({
//           name: `${String(d.Month).padStart(2, '0')}/${d.Year}`,
//           value: d.Total
//         }))
//       },
//       {
//         name: 'Siniestros',
//         series: sinisters.map((d: any) => ({
//           name: `${String(d.Month).padStart(2, '0')}/${d.Year}`,
//           value: d.Total
//         }))
//       }
//     ];
//   });
// }