import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { RoutesModule} from './routes.module'
import { HttpModule } from '@angular/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { SalesComponent } from './main/trade/sales/sales.component';
import { PurchasesComponent } from './main/trade/purchases/purchases.component';
import { HomeComponent } from './main/home/home.component';

import { AuthService } from './auth.service'
import { RoutesGuard } from './routes-guard.service'
import { ServerService } from './server.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SalesComponent,
    PurchasesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    RoutesModule,
    HttpModule
  ],
  providers: [AuthService, RoutesGuard, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
