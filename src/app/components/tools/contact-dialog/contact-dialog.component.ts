import { Component } from '@angular/core';
import { Input } from '@angular/core'; import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';

/**
 * @title Dialog elements
 */

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './dialog-Contact.html',
  styleUrl: './contact-dialog.component.css'
})
export class ContactDialogComponent {
  data = 'Contact';
  @Input() arraySt: string[] = [];
  @Input() arrayCol: string[] = [];
  constructor(public dialog: MatDialog) { }

  openDialog(arraySt: string[], arrayCol: string[]) {
    // console.log(arraySt, this.arrayCol);
    this.dialog.open(DialogElementsExampleDialog, {

      data: {
        arrays: arraySt,
        arraysc: arrayCol
      }
    });

  }
}

@Component({
  selector: 'app-ContactDialog',
  templateUrl: 'contact-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, AutoCompleteComponent, YesNoDialogComponent],
})
export class DialogElementsExampleDialog {
  public streets: string[] = [];
  public settlement: string[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.streets = data.arrays;
    this.settlement = data.arraysc;
  }


}

