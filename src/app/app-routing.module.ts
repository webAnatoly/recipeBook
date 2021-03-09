import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewChildExampleComponent } from './view-child-example/view-child-example.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'example-view-child', component: ViewChildExampleComponent },
  { path: 'reactive-form', component: ReactiveFormComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not fount'} },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
