import { Component } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { AuthService } from '../../../services/security/authService.service';
import { Router } from '@angular/router';
import {DialogAnimationsExampleDialog} from '../../tools/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  selectedOption: string = 'home';
  isMenuOpen = false;
  menuWidth = '70px'; // Ancho inicial
  headerWidth = '3.7%'; // Ancho inicial
  iconButtonWidth = '1%'; 
  constructor(private router: Router,private auth:AuthService,public dialog: MatDialog) { }

  isActive(path: string): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith(path);
  }
logOut(){
this.auth.logout();
}
closeSession(){
  debugger
  this.auth.logout();
  this.router.navigate(['/login']);
}

  toggleMenu() {
    debugger
    if (this.isMenuOpen) {
      this.closeMenu();
    }
    else {
    this.menuWidth = '270px'; // abre el menu
    this.headerWidth = '270px'
    this.iconButtonWidth = '12%'; 
    this.isMenuOpen = true;
    }
  }
  closeMenu() {
    this.menuWidth = '70px'; // cierra el menu
    this.headerWidth = '3.7%'
    this.iconButtonWidth = '1%'; 
    this.isMenuOpen = false;
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, contentDialog: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '530px',
      height: '180px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        contentDialog: contentDialog,
        nameObj: name,
        title: 'Cerrar Sesión',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.closeSession();
      }
    });
  }

}
