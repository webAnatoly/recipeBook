import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { OverlayComponent } from './shared/components/overlay/overlay.component'; // наш кастомный модуль

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // наш кастомный модуль
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
