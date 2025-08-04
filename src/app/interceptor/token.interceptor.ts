import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/security/authService.service';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../components/tools/info-dialog/notification.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isJWTExpiredDialog = false;
    constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.isJWTExpiredDialog = false;
        const token = `Bearer ${this.authService.getToken()}`;
        const urlNow = this.router.url;
        // console.log(urlNow);
        //Verificar que no se envíe el encabezado de autorización en LogIn
        if (this.router.url === '/login') {
            const headerClone = req.clone();
            return next.handle(headerClone);
        }
        const headers = new HttpHeaders({
            Authorization: token,
        })
        const headerClone = req.clone({ headers })
        return next.handle(headerClone).pipe(
            catchError((err: any) => {
                console.log(err);
                if ([401, 403].indexOf(err.status) !== -1) {
                    this.authService.logout();
                    if (!this.isJWTExpiredDialog) {
                        this.router.navigate(['/login']);
                        this.notificationService.alert("El token ya vencio, porfavor introduzca sus credenciales de nuevo.", 'Inicie sesion porfavor');
                        this.isJWTExpiredDialog = true;
                    }
                }
                return throwError(() => new Error('test'));
            })
        );
    }
}
