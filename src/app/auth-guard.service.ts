/*
Этот сервис выполняет роль так называемого Route Guards

So basically functionality, logic, code which is executed before a route is loaded or once you want to leave a route.

Route Guards это функционал, логика, код которые выполняются до того как маршруты и соответствующие им компоненты
будут созданы. Это позволяет делать проверку на авторизацию не в каждом компоненте,
а для указанного маршрута роутера и для всех его вложенных маршрутов и компонентов.

Т.е до того, как роутер отрендерит свои маршруты, делается проверка и если проверка возвращает true, то маршрут строится,
компоненты будут доступны по маршруту. В противном случае, если проверка возвращает false, то данный маршрут просто не
будет доступен, вместе со всеми компонентами.

Эти проверки делаются путем реализации методов CanActivate - для корневых роутов и CanActivateChild - для вложенных роутов.

 */

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
