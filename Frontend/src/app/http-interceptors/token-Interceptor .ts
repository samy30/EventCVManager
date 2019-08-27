import { AuthService } from '../Services/auth.service';
import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,private injector:Injector
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService=this.injector.get(AuthService);
    const accessToken = authService.getToken();
    console.log("herere");
    if (accessToken ) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
         // 'x-auth-token': `${accessToken}`
         'Authorization':'bearer '+ `${accessToken}`
        }
      });
    }
     return next.handle(request);
  }
}
