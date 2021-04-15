import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelStateError = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateError.push(error.error.errors[key]);
                  }
                }
                throw modelStateError.flat();
              } else {
                this.toastr.error(error.statusText, error.status);
              }
              break;
            case 400:
              this.toastr.error(error.statusText, error.status);
              break;
            case 401:
              this.toastr.error("UnAuthurized", error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } }
              this.router.navigateByUrl("server-error", navigationExtras);
              break;
            default:
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}
