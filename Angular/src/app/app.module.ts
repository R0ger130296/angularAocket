import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
 import { SocketIoModule } from 'ngx-socket-io'

 import { WebServicesService } from './servicios/web-services.service'
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule
  ],
  providers: [WebServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
