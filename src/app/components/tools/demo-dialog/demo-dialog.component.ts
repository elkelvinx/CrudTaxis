import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.css']
})
export class DemoDialogComponent {
  constructor(private dialogRef: MatDialogRef<DemoDialogComponent>) {}

  // 👇 Envía las credenciales seleccionadas al componente padre
  selectCredentials(username: string, password: string) {
    this.dialogRef.close({ username, password });
  }

  videoUrl = 'https://taxiapp.blob.core.windows.net/documents/vids/Espanish Vid.mp4';
  videoUrlEnglish = 'https://taxiapp.blob.core.windows.net/documents/vids/Explanation Vid English.mp4';
}
