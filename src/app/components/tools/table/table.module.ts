import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColumnValuePipe } from '../../../pipes/column-value.pipe';

@NgModule({
  declarations: [TableComponent, ColumnValuePipe],
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule,],
  exports: [TableComponent],
})
export class TableModule { }
