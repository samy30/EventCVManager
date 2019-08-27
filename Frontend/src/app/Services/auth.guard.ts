import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService : AuthService) {

      console.log("guard constructor");
     }

    canActivate():boolean {
      if (!this.authService.loggedIn())
        {
           console.log("redirect Login");
           this.authService.logout();
           this.router.navigate(['/Login']);
            return false;
        }
      else {
       // this.router.navigate(['/Profil']);
        return true;
      }
   }
 }
