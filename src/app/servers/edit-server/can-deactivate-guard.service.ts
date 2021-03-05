import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

/*
Сервис для проверки роута (деактивации роута) при уходе с данного роута.
Например юзер покидает условную страницу (роут) и этот сервис срабатывает.
Таким образом, можно, например делать проверку сохранил ли пользователь данные формы при покидании им текущего роута.
 */

// Создаем свой интерфейс и он похож на тот что используется нами сервисе в auth-guard.service.ts
// This interface forces some component or some class to implement the canDeactivate method
// Might sound complicated but this is the set up which will make sure that we later can easily connect a component
// to our CanDeactivateGuard here.
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
// CanDeactivate - это интерфейс provided by Angular router, в моей IDE можно его посмотреть по Ctrl + Click
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

  // This is the canDeactivate method which will be called by the Angular router once we try to leave a route.
  canDeactivate(
    component: CanComponentDeactivate, // компонент имплементирующий нами созданный интерфейс CanComponentDeactivate
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): // nextState argument means Where do you want to go.
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // to call canDeactivate on the component we're currently on
    return component.canDeactivate();

  }
}
