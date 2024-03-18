import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pipe, PipeTransform } from '@angular/core';

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

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(value => this._filter(value || '')),
    );
    // console.log(this.filteredOptions.forEach(element => { console.log(element) }) + " hola");
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrays.filter(option => option.toLowerCase().includes(filterValue));
  }
  changeName() {
    // debugger;
    console.log(this.filteredOptions + " " + this.myControl.value)
    this.data.emit(this.myControl.value);
  }
}

@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = '') {
    return collection.filter((item) => item.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
  }
}
