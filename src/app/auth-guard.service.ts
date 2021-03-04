import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private router: Router) { }


  /* Делает проверки, которые мы хотим и если всё ок, то активирует компоненты по указанному роуту */
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

  // Метод для проверки (активации) вложенных путей. Т.е. идея такая же как и у canActivate, только для вложеных роутеров
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.canActivate(route, state);
  }
}

/*

CanActivate - Interface that a class can implement to be a guard deciding if a route can be activated.
If all guards return true, navigation continues. If any guard returns false, navigation is cancelled.
If any guard returns a UrlTree, the current navigation is cancelled and a new navigation begins to the UrlTree returned
from the guard.
https://angular.io/api/router/CanActivate
*/
