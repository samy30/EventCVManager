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

    canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):boolean {
                  const allowedRoles = next.data.allowedRoles;
                  let result=this.authService.isAuthorized(allowedRoles);   
                  if(!this.authService.loggedIn()){
                    console.log("redirect *********** Login");
                    this.authService.logout();
                    this.router.navigate(['/Login']);
                     return false;
                  }                  
                  else if (!result)
                    {
                      console.log("redirect *********** Profil");
                      console.log(this.authService.isAuthorized(allowedRoles))  
                      this.router.navigate(['/Profil']);
                      return false;
                    }
                  else {               
                    return true;
                  }
                  
         }
 }
