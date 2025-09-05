import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.css']
})
export class DemoDialogComponent {
  openVideo(lang: 'es' | 'en') {
    const url =
      lang === 'es'
        ? 'https://tu-link-video-es.com'
        : 'https://tu-link-video-en.com';
    window.open(url, '_blank');
  }
}
