import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

/*
FormsModule позволяет использовать директиву [(ngModel)] в шаблоне, ну и видимо еще что-то связанное с формами.
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, /* Её нужно помещать сюда, чтобы ангуляр её смог заюзать во свех компонентах относящихся к этому модулю.
    Так как app.module.ts является корневым компонентом, то дериктивы из FormsModule будут доступны во всём приложении.
    Надеюсь я правильно понял концепцию NgModules.
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

