import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserComponent }, // добавляем id параметр роутеру, который будет доступен в компоненте
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not fount'} },
  { path: '**', redirectTo: '/not-found'}
  // ** - this is the wildcard route which means catch all paths you don't know and the order is super important here.
  // path: '**', redirectTo: '/not-found'
  // Должен быть на последнем мессте в массиве, потому что ангуляр парсит роутеры по-порядку от начала массива.

  /* Static data
  The data property in the route is a place to store arbitrary data associated with this specific route.
  The data property is accessible within each activated route. Use it to store items such as page titles,
  breadcrumb text, and other read-only, static data. https://angular.io/guide/router
  You can use the [resolve guard](https://angular.io/guide/router-tutorial-toh#resolve-guard) to retrieve dynamic data.
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // RouterModule.forRoot(appRoutes, {useHash: true}), // включает режим с # перед нашими путями в URL
    // For instance, if you call location.go('/foo'), the browser's URL will become example.com#/foo.
    // Я так понимаю эта опция полезна, тогда, когда нет возможности настроить сервер, чтобы он всегда возвращал index.html
    // see more https://angular.io/api/common/HashLocationStrategy#description
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
