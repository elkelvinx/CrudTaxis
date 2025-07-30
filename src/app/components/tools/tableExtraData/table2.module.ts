import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Table2 } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColumnValuePipe } from '../../../pipes/column-value.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component'
import { InsertDialogComponent } from '../edit-dialog/insert-dialog/insert-dialog.component';
@NgModule({
  declarations: [Table2, ColumnValuePipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    YesNoDialogComponent,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    EditDialogComponent,
    InsertDialogComponent,
    NgIf,
  
  ],
  exports: [Table2],
})
export class Tables2 { }
