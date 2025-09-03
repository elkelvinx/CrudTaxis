import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/security/authService.service';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../components/tools/info-dialog/notification.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private dialogShown = false;
    private dialogTimeout: any = null;

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.router.url === '/login') {
            this.dialogShown = false;
            if (this.dialogTimeout) {
                clearTimeout(this.dialogTimeout);
                this.dialogTimeout = null;
            }
            return next.handle(req.clone());
        }

        const token = `Bearer ${this.authService.getToken()}`;
        const authReq = req.clone({
            headers: req.headers.set('Authorization', token)
        });

        return next.handle(authReq).pipe(
            catchError((err: any) => {
                if ([401, 403].indexOf(err.status) !== -1) {
                    this.handleAuthError();
                }
                return throwError(() => err);
            })
        );
    }

    private handleAuthError(): void {
        if (this.dialogShown) return;

        this.dialogShown = true;
        this.authService.logout();
        this.router.navigate(['/login']);

        // Mostrar dialog después de la navegación
        this.dialogTimeout = setTimeout(() => {
            this.notificationService.alert(
                "Su sesión ha expirado. Por favor, inicie sesión nuevamente.", 
                'Sesión Expirada'
            );
            this.dialogShown = false;
        }, 300);
    }
}
