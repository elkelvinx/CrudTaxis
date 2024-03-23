import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
})
export class YesNoDialogComponent {
  //pregunta que hara el dialog
  @Input() text: string = '';
  @Input() name: any;
  @Input() IconButton: boolean = true;
  //bool que devolvemos al padre
  @Output() data = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }
  ChangeName() {
    this.data.emit(true);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string, name: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '520px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        contentDialog: contentDialog,
        nameObj: name,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ChangeName();
      }
    });
  }
}
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'yesNoDialog.componentStructure.html',
  styleUrl: './yes-no-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  public contentDialog: String;
  public nameObj: any;
  //de aqui para abajo es no comprendo al 100%
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public CommonModule: CommonModule,

    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.contentDialog = data.contentDialog;
    this.nameObj = data.nameObj;
  }
  ChangeName() {
    this.dialogRef.close(true);
  }
}
