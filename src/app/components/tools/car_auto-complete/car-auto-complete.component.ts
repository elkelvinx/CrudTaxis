import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExtraDataService } from './services/extra-data.service';
import { Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'car-autoComplete',
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
export class carAutoCompleteComponent {
  @Input() typeinput: number = 0;
  //tengo que ver si realmente podria obtener el nombre de todos los modelos con su id para asi evitar la busqueda tan exaustiva 
  @Input() className: string = 'defaultClass';
  //texto del dato que se pide
  @Input() text: string = '';
  //valor actual de la variable
  @Input() info: any;
  //arreglo que trae datos
  @Input() arrays: string[] = [];
  //arreglo por si es el model
  @Input() arrays2: string[] = [];
  //devuelve el valor nuevo
  @Output() data = new EventEmitter<any>();
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  //variables necesarias para dependencia entre inputs
  @Input() brand: { id: number; name: string }[] = [];
  @Input() modelsInput: { id: number; idBrand: number; name: string }[] = [];
  public models: { id: number; idBrand: number; name: string }[] = [];

  @Input() brandSelected: number = 0;
  brandModified: boolean = false;
  constructor(
    private number: ExtraDataService
  ) { }
  ngOnInit() {
    if (this.number.bool == false)
      this.models = this.modelsInput;
    if (this.typeinput === 1) {
      this.brandModified = true;
    }
    else if (this.typeinput === 2) {
      debugger
      this.changeModel();
      this.brandModified = false;
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(

      debounceTime(200),
      startWith(''),
      map(value => {
        debugger
        console.log("Value Changes: ", value); // Agregar para depuración
        return this._filter(value || '');
      }),
    );
    if (this.typeinput === 2) {
      debugger
      this.filteredOptions = this.myControl.valueChanges.pipe(
        debounceTime(200),
        startWith(''),
        map(value => {
          console.log("Value Changes: ", value); // Agregar para depuración
          return this._filter2(value || '');
        }),
      );

    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrays.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrays2.filter(option => option.toLowerCase().includes(filterValue));
  }

  changeModel() {
    if (this.number.bool == true) {
      this.arrays2 = this.number.models
        .filter(model => model.idBrand === this.number.selectedBrandId)
        .map(filteredModel => filteredModel.name);
      if (this.typeinput === 2) {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          debounceTime(200),
          startWith(''),
          map(value => {
            // console.log("Value Changes: ", value); // Agregar para depuración
            return this._filter2(value || '');
          }),
        );
      }
      // debugger
    }
    else if (this.number.bool == false) {
      debugger;
      // Filtrar el array de modelos para obtener solo los nombres de los modelos que coincidan con la marca seleccionada
      this.arrays2 = this.models
        .filter(model => model.idBrand === this.number.selectedBrandId)
        .map(filteredModel => filteredModel.name);
      console.log(this.arrays2);
      this.number.models = this.models;
      this.number.bool = true;
    }

  }
  changeBrand() {
    // en este for pasamos al service el id del brand seleccionado
    for (let i = 0; i < this.brand.length; i++) {
      if (this.brand[i].name === this.myControl.value) {
        this.number.selectedBrandId = this.brand[i].id;
        debugger
      }
    }
    this.data.emit(this.myControl.value);
    this.changeModel();
  }
  onSelection(event: MatAutocompleteSelectedEvent) {
    //me falta ver que metodo llamar
    this.myControl.setValue(event.option.value);
    this.data.emit(this.myControl.value);
    this.changeBrand(); // O la función correspondiente
    debugger
  }
}

@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = '') {
    return collection.filter((item) => item.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
  }
}
