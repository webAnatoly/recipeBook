import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.authService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/']).catch(error => console.error(error));
          return false;
          // After navigation away, you must retun false - though you will prevent the original navigation from happening anyways.
        }
      }
    );
  }
}

/*

CanActivate - Interface that a class can implement to be a guard deciding if a route can be activated.
If all guards return true, navigation continues. If any guard returns false, navigation is cancelled.
If any guard returns a UrlTree, the current navigation is cancelled and a new navigation begins to the UrlTree returned
from the guard.
https://angular.io/api/router/CanActivate
*/
