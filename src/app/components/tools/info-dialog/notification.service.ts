import { Component, Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Presents a toast displaying the message with a green background
   * @param message Message to display
   * @example
   * this.notificationService.success("confirm oked");
   */
  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  /**
   * Presents a toast displaying the message with a red background
   * @param message Message to display
   * @vacio
   * @className   estilo
   * @duration    duracion de el mensaje    
   * this.notificationService.error("confirm canceled");
   */
  error(message: string) {
    this.openSnackBar(message, '', 'error-snackbar', 2000);
  }

  /**
   * Shows a confirmation modal, presenting the user with
   * an OK and Cancel button. 
   * @param message Body of the modal
   * @param okCallback Optional function to call when the user clicks Ok
   * @param title Optional modal title
   * @param cancelCallback Option function to call when the user clicks Cancel
   * @example
   * //displays a success or error message depending on what button is clicked.
   * this.notificationService.confirmation(
   * 'it will be gone forever', //message body
   * () => { //okCallback
      this.notificationService.success("confirm oked");
    },
    'Are you sure?', //title
     () => { //cancelCallback
      this.notificationService.error("confirm canceled");
    });
   */
  confirmation(
    message: string,
    okCallback: () => void,
    title = 'Are you sure?',
    cancelCallback: () => any = () => { }
  ) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '3500px',
      data: { message: message, title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
      if (!result && cancelCallback) {
        cancelCallback();
      }
    });
  }

  /**
  * Shows a modal, presenting the user with an OK button.
  * @param message Body of the modal
  * @param okCallback Optional function to call when the user clicks Ok
  * @param title Optional modal title
  * @example
  * //displays a success when the Ok button is clicked.
  *  this.notificationService.alert("an alert", "notice", () => {
      this.notificationService.success("alert oked");
    });
  */
  //! AlertDialog
  alert(message: string, title = 'Notice', okCallback: () => void = () => { }) {
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '1450px',
      height: '290px',
      data: { message: message, title: title },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
    });
  }
  /**
   * Displays a toast with provided message
   * @param message Message to display
   * @param action Action text, e.g. Close, Done, etc
   * @param className Optional extra css class to apply
   * @param duration Optional number of SECONDS to display the notification for
   */
  // ! Abre el dialogo, puede abrir de muchos tipos
  openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 1000,

  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}

export interface DialogData {
  message: string;
  title: string;
}
//! YesNo Dialog
@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
     {{data.message}}
    </div>
    <div mat-dialog-actions>
       <button mat-raised-button color="warn" (click)="onNoClick()">
        Cancel
      </button>
      <button mat-raised-button color="primary" (click)="onYesClick()" cdkFocusInitial>
        Ok
      </button>
    </div>
  `
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content class="contentStyle">
     {{data.message}}
    </div>
    <div mat-dialog-actions>      
   <div  style="width: 100%!important;
                display: flex;
                justify-content: space-around;">
      <button
              mat-raised-button
              (click)="onYesClick()"
              color="primary"
              class="text-button-greenFinal"
            >Enterado</button>
     </div>
    </div>
  `,
  styleUrl: './info-dialog.component.css',
  standalone: true,
  imports:
    [MatInputModule,
      MatDialogActions,
      MatDialogClose,
      MatDialogTitle,
      MatDialogContent,
      MatButtonModule,
      FormsModule,
      MatIconModule,
      CommonModule,
      MatFormFieldModule],
})
export class AlertDialog {
  constructor(
    public dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
