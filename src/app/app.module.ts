import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

//components
import { AppComponent } from './app.component';
import { LoginComponentCorp } from './corp/auth/login/login.component';
import { LoginComponentGlobal } from './global/auth/login/login.component';

import { MainComponent } from './main/main.component';
import { SalesComponent } from './main/trade/sales/sales.component';
import { PurchasesComponent } from './main/trade/purchases/purchases.component';
import { HomeComponent } from './main/home/home.component';

//modules and services
import { RoutesModule } from './router/routes.module';
import { AuthService } from './services/auth.service'
import { RoutesGuardGlobal } from './router/routes-guard-global.service'
import { RoutesGuardCorp } from './router/routes-guard-corp.service'
import { ServerService } from './services/server.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentCorp,
    LoginComponentGlobal,
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
  providers: [AuthService, RoutesGuardGlobal, RoutesGuardCorp, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
