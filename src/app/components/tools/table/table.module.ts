import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnValuePipe2 } from '../../../pipes/column-value2.pipe';

@NgModule({
  declarations: [TableComponent, ColumnValuePipe2],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    YesNoDialogComponent,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [TableComponent],
})
export class TableModule { }
