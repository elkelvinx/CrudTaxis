import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.css']
})
export class DemoDialogComponent {
  videoUrl = 'https://taxiapp.blob.core.windows.net/documents/vids/Espanish Vid.mp4';
  videoUrlEnglish = 'https://taxiapp.blob.core.windows.net/documents/vids/Explanation Vid English.mp4';

  openVideo(lang: 'es' | 'en') {
    const url =
      lang === 'es'
        ? 'https://taxiapp.blob.core.windows.net/documents/vids/Espanish Vid.mp4'
        : 'https://taxiapp.blob.core.windows.net/documents/vids/Explanation Vid English.mp4';
    window.open(url, '_blank');
  }
}
