import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

//services
import { AppService } from '../../../services/services-app.service'

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,

  ],
})
export class AutoCompleteComponent {

  //css a utilizar
  @Input() className: string;
  @Input() defaultClass: string = 'defaultClass';
  //texto del dato que se pide
  @Input() text: string = '';
  //valor actual de la variable
  @Input() info: any;
  //arreglo que trae datos
  @Input() arrays: string[] = [];
  //devuelve el valor nuevo
  @Output() data = new EventEmitter<any>();
  //opciones para el autocomplete
  options: string[] = this.arrays;
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  constructor(
    private servicioApp: AppService
  ) { }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      //tiempo de espera para que se ejecute el filtro
      debounceTime(200),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrays.filter(option => option.toLowerCase().includes(filterValue));
  }

  ChangeName() {
    this.data.emit(this.myControl.value);
  }

}
