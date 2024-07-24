import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "./notification.service";
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css'
})
export class InfoDialogComponent {
  private messageDefault:string=
  'Hubo un error, el mensaje de error no llego o se perdio, porfavor contacte a la persona de sistemas'
 
  constructor(
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 0,
      panelClass: [className]
    });
  }

  showAlert(title: string='Informacion del error', content: string=this.messageDefault) {
    this.notificationService.alert(content, title, () => {
      this.notificationService.success("Lo notificare!");
    });
  }

  showConfirm() {
    this.notificationService.confirmation("it will be gone forever", () => {
      this.notificationService.success("confirm oked");
    },
      'Are you sure?',
      () => {
        this.notificationService.error("confirm canceled");
      });
  }
}