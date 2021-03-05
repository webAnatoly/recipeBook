import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }] // добавляем id и name параметры роутеру, которые будет доступны в компоненте
  },
  { path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService], // Angular run this guard whenever we try to access this path, точнее вложенные роуты
    component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent,
        canDeactivate: [CanDeactivateGuardService] // Angular run this guard whenever we try to LEAVE this path,
        // точнее когда мы пытаемся покинуть компонент загруженный по этому пути.
      }

    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
  // ** - this is the wildcard route which means catch all paths you don't know and the order is super important here.
  // path: '**', redirectTo: '/not-found'
  // Должен быть на последнем мессте в массиве, потому что ангуляр парсит роутеры по-порядку от начала массива.

  /*
  canActivate: [AuthGuardService] - это так называемый Guard. Это штука в ангуляровском роутере, которая позволяет
  выполнять проверчный код, до того как роутер построит маршрути и компоненты. И если эта штука вернет в итоге false,
  то роутер не будет показывать все компонеты, которые зарегистрированы для данного маршрута.

  Эту штуку нужно писать самому и там может быть разная логика в зависимости от наших потребностей. В качестве примера
  здесь приведен пример с проверкой авторизации в файле в файле auth-guard.service.ts AuthGuardService, который
  мы передаем роутеру в параметре canActivate: [AuthGuardService]

  canActivate: [AuthGuardService] takes an array of all the code basically, all the guards you want to apply to this route.
  Пока что мы написали только один Guard в файле auth-guard.service.ts AuthGuardService
  And now this will make sure that servers is now only accessible and all the child routes, only accessible
  if the auth guard canActivate method returns true in the end which will only happen if in the auth service,
  loggedIn is set to true.
   */
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
  /*Exports simply tells Angular, hey from this module, if I were to add this module to the imports of another module,
  what should be accessible to this module which imports this module.
  Короче, как я понял, в массиве exports перечисляются модули которые должны быть доступны там,
  где этот модуль будет импортироваться.

  And the one thing we want to make accessible is our router module.*/
})
export class AppRoutingModule {

}
