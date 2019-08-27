import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { of } from 'rxjs';
import { tap, map  } from 'rxjs/operators';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class CrosInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const credentialsReq = req.clone({withCredentials: true, setHeaders: {'X-XSRF-TOKEN': 'MY-TOKEN', 'Content-Type': 'application/json'}});
    return next.handle(credentialsReq).pipe(
      (tap(event => {
        if (event instanceof HttpResponse) {
           console.log('200 res');

        }
      }, err => {

        if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log('401 res');

        }
    })
    ));
}
}