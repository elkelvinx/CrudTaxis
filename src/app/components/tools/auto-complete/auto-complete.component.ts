import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExtraDataService } from './services/extra-data.service';

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
  //podria poner  @Input() color: string = '#FFFFFF';
  @Input() typeinput: number = 0;
  //tengo que ver si realmente podria obtener el nombre de todos los modelos con su id para asi evitar la busqueda tan exaustiva 
  @Input() className: string = 'defaultClass';
  //texto del dato que se pide
  @Input() text: string = '';
  //valor actual de la variable
  @Input() info: any;
  //arreglo que trae datos
  @Input() arrays: string[] = [];
  //devuelve el valor nuevo
  @Output() data = new EventEmitter<any>();
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  //valores a validar 
  //variable a pasar si uso brand
  @Input() brand: { id: number; name: string }[] = [];
  @Input() models: { id: number; idBrand: number; name: string }[] = [];
  @Input() brandSelected: number = 0;
  brandModified: boolean = false;
  constructor(
    private servicioApp: AppService,
    private number: ExtraDataService
  ) { }
  ngOnInit() {
    // if (this.typeinput === 0) 
    if (this.typeinput === 1) {
      this.brandModified = true;
    }
    else if (this.typeinput === 2) {
      this.changeModel();
      this.brandModified = false;
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrays.filter(option => option.toLowerCase().includes(filterValue));
  }

  changeModel() {

  }
  changeBrand() {
    // en este for pasamos al service el id del brand seleccionado
    for (let i = 0; i < this.brand.length; i++) {
      if (this.brand[i].name === this.myControl.value) {
        this.number.selectedBrandId = this.brand[i].id;
        // this.brandModified = false;
      }
    }
    //de todos modos tenemos que hacer el emmit para que se actualice el valor
    debugger;
    console.log(this.number.selectedBrandId + " IDbrand general");
    this.data.emit(this.myControl.value);
  }

  changeName() {
    //este es normal y corriente
    debugger;
    this.data.emit(this.myControl.value);
  }
}
