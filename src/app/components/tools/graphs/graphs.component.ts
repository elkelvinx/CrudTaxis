
import { Component } from '@angular/core';
import {KpiCardsComponent} from '../../tools/kpi-cards/kpi-cards.component'
@Component({
  selector: 'app-graphs',
  standalone: false,
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent {
  constructor() { }  
  //! BORRAR ESTO SOLO ES TEMPORAL
  loadDataFromPayload(payload: { StartDate: string, EndDate: string }) {
  console.log('Payload recibido:', payload);
  // Aquí decides si llamar a tus servicios o pasar info al graph-range
}
onRangeChanged(event: any) {
  console.log('Evento de GraphRange:', event);
  // Aquí reaccionas a los cambios en la gráfica si lo necesitas
}

}