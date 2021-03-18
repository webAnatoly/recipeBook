import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';
import { WrapMePipe } from './wrap-me.pipe';
import { FilterPipe } from './filter.pipe';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    WrapMePipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      /* HTTP_INTERCEPTOR - this is the token by which this injection can later be identified by Angular,
      so it will basically know that all the classes you provide on that token, so by using that identifier,
      should be treated as HTTP interceptors
      and should therefore run their intercept method whenever a request leaves the application.*/
      useClass: AuthInterceptorService,
      /* The second key you pass to that object is the use class key where you now point at your interceptor class
      you want to add as an interceptor and here, that would be the AuthInterceptorService.*/
      multi: true
      /* You can have more than one interceptor and you inform Angular about that and that it should
      not replace the existing interceptors with this one by adding multi: true*/

      /* So this is just a dependency injection syntax supported by Angular that allows it to register a service
      under a different identifier and to have actually multiple services under that identifier,
      which will than all be provided and injected.*/
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
