import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }] // добавляем id и name параметры роутеру, которые будет доступны в компоненте
  },
  { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
  // ** - this is the wildcard route which means catch all paths you don't know and the order is super important here.
  // path: '**', redirectTo: '/not-found'
  // Должен быть на последнем мессте в массиве, потому что ангуляр парсит роутеры по-порядку от начала массива.
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
