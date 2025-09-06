import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { AuthService } from '../../../services/security/authService.service';
import { Router } from '@angular/router';
import { DialogAnimationsExampleDialog } from '../../tools/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  selectedOption: string = 'home';
  permissions: any;
  isMenuOpen = false;
  menuWidth = '70px'; // Ancho inicial
  headerWidth = '3.7%'; // Ancho inicial
  iconButtonWidth = '0%'; //Ancho del icono
  constructor(private router: Router, private auth: AuthService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.permissions = this.auth.getDecodedToken();
    this.userName = this.auth.getUserName();
  }
  isActive(path: string): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith(path);
  }
  logOut() {
    this.auth.logout();
  }
  closeSession() {
    debugger
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
    else {
      this.menuWidth = '220px'; // abre el menu
      this.headerWidth = '270px'
      this.iconButtonWidth = '220px';
      this.isMenuOpen = true;
    }
  }
  closeMenu() {
    this.menuWidth = '70px'; // cierra el menu
    this.headerWidth = '3.7%'
    this.iconButtonWidth = '0%';
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
