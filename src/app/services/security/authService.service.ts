import { Injectable } from '@angular/core';
import { NotificationService } from '../../components/tools/info-dialog/notification.service';
import * as jwt_decode from 'jwt-decode';
import { LogInService } from './log-in.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private notificationService: NotificationService, private logIn:LogInService) { }
    // Suponiendo que guardas el token JWT en el almacenamiento local del navegador
    getToken(): string | null {
      return localStorage.getItem('token');
    }
    getDecodedToken(): any {
      const token = this.getToken();
      if(token) {
        return jwt_decode.jwtDecode(token);
      }
      return null;
    }
    getUserName(): string {
      const token = this.getToken();
      if(token) {
        const decodedToken: any = jwt_decode.jwtDecode(token);
        return decodedToken.nameid;
      }
      return '';
    }
    // Verifica si el usuario está autenticado
    verifyPermission(section:string): boolean {
      const token = this.getToken();
      if(token) {
        const decodedToken: any = jwt_decode.jwtDecode(token);
        if (decodedToken[section]=='True')
          return true;
        else{
          this.notificationService.alert("usted no tiene acceso a la seccion "+ section+" de la pagina", 'No cuenta con los permisos necesarios');
          return false
        }
      }
      else
      debugger
      
      return false; //no tiene token == no se ha logeado
    }
  
    // Guardar el token JWT en el almacenamiento local
    setToken(token: string): void {
      localStorage.setItem('token', token);
    }
  
    // Remover el token JWT del almacenamiento local
    logout(): void {
      var nameUser = this.getUserName();
      this.logIn.closeSession(nameUser).subscribe(
        (data:any) => {
          this.notificationService.alert("El usuario "+data +" ha cerrado sesion", 'Sesion cerrada');
        },
        error => {
          console.log(error);
        }
      )
      localStorage.removeItem('token');
    }
}
