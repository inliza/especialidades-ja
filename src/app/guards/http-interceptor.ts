import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
// import { ToastService } from '../services/toast.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class Http_Interceptor implements HttpInterceptor {
  constructor(
    private readonly userService: AuthService,
    // private readonly toast: ToastService,
    private helperModal: MatDialog,

  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let test = localStorage.getItem('token');
    if (test) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${test}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (err: Response) => {
          if (err.status === 401 || err.status === 403) {
            var ruta = window.location.href;
            if (ruta.includes('/academy')) {
              // setTimeout(() => {
              this.helperModal.closeAll();
              // this.toast.showToast('warning', 'Su sesión ha expirado. Por favor inicie sesión.', 'center');
              this.userService.logout();
              // }, 0);
            } else {
              this.helperModal.closeAll();
              this.userService.logout();
              // this.userService.logoutNoRedirect();
            }

          }

        }
      )
    );
  }
}
