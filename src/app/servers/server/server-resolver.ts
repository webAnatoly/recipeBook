/*
Resolver is a sevrvice just like canActivate or canDeactivate which will allow us to run some code before a route is rendered.
(Т.е. это тоже самое, что и сanActivate or canDeactivate, только там мы проверяем возможность показа/ухода и всё,
а здесь мы можем выполнять какой-то код до того как отрендерится указанный роут. Например это может быть запрос на сервер,
ну или еще что-то, любой нужный нам код, который хотим выполнить до рендеренга роута)

Of course the alternative is to render the component or the target page instantly
and in the ngOnInint method you could then fetch the data and display some spinner whilst you are doing so.
But if you want to load it before actually displaying the route, this is how you would add such a resolver.
 */
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import { Injectable } from '@angular/core'; // Resolve interface provided by angular router.

interface OurServer {
  id: number;
  name: string;
  status: string;
}

@Injectable({providedIn: 'root'})
// Example of some dynamic data we have to fetch before a route can be displayed or can be rendered.
export class ServerResolver implements Resolve<OurServer>{
  /*
  The Resolve is a generic type and it should wrap whichever item or data field you will get here, will fetch in the end.
  So we will fetch a server here and therefore we should define the type here,
  now you could outsource this into an interface or a model in general.
  So this is simply a type definition of the thing this resolver give us in the end, to what it will resolve in the end.

  Короче мы определили тип вот так вот <{id: number, name: string, status: string}> инлайново, ну или в интерфейсе для удобвства
  Это тип данный которые Resolver должен нам в итоге вернуть.

  Вот описание из документации:
  Interface that classes can implement to be a data provider.
  A data provider class can be used with the router to resolve data during navigation.
  see more https://angular.io/api/router/Resolve
  */

  constructor(private serversService: ServersService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<OurServer> | Promise<OurServer> | OurServer {

    return this.serversService.getServer(+route.params.id);
    /*
    Особенно полезен этот резолвер для асинхронного получения каких то данных. Но здесь в качестве простого примера
    мы синхронные данные резолвим.
    */

    // пример с промисом
    // return new Promise((resolve, reject) => {
    //   // тут асинхронный код
    //   setTimeout(() => {
    //     resolve(this.serversService.getServer(+route.params.id));
    //   }, 3000);
    // });

  }


}

