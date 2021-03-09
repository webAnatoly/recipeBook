import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* В ангуляре существует два подхода работы с формами Template Driven and Reactive

для Template Driven подхода нужен модуль FormsModule,
для Reactive подхода нужен модуль ReactiveFormsModule

В этом приложении я знакомлюсь с обоими подходами, поэтому импортирую оба модуля.
 */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { OverlayComponent } from './shared/components/overlay/overlay.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewChildExampleComponent } from './view-child-example/view-child-example.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    OverlayComponent,
    ErrorPageComponent,
    ViewChildExampleComponent,
    HeaderComponent,
    HomeComponent,
    ReactiveFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // для работы с формами в стиле Template Driven Approach
    ReactiveFormsModule, // для работы с формами в реактивном стиле
    /* ReactiveFormsModule containing all the tools we need to build our form on our own and then connect it to our HTML code.*/
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
