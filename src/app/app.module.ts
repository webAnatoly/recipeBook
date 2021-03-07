import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { OverlayComponent } from './shared/components/overlay/overlay.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    OverlayComponent,
    ErrorPageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // наш кастомный модуль
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
