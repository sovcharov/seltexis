import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

import { CookieService } from 'angular2-cookie/services/cookies.service';

//modules and services
import { RoutesModule } from './router/routes.module';
import { AuthService } from './services/auth.service'
import { RoutesCheckCompany } from './router/routes-check-company.service'
import { RoutesGuardCorp } from './router/routes-guard-corp.service'
import { ServerService } from './services/server.service';

//components
import { AppComponent } from './app.component';
import { LoginComponentCorp } from './corp/auth/login/login.component';
import { SalesComponent } from './corp/main/trade/sales/sales.component';
import { PurchasesComponent } from './corp/main/trade/purchases/purchases.component';
import { HomeComponent } from './corp/main/trade/home/home.component';
import { TradeComponent } from './corp/main/trade/trade.component';
import { StoreComponent } from './corp/main/store/store.component';
import { MainComponent } from './corp/main/main.component';
import { RegisterComponent } from './corp/auth/register/register.component';
import { RegisterCompanyComponent } from './corp/auth/register-company/register-company.component';
import { AlertsComponent } from './corp/alerts/alerts.component';
import { AlertService } from './services/alert.service';
import { CompanyService } from './services/company.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponentCorp,
    SalesComponent,
    PurchasesComponent,
    HomeComponent,
    TradeComponent,
    StoreComponent,
    MainComponent,
    RegisterComponent,
    RegisterCompanyComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    RoutesModule,
    HttpModule
  ],
  providers: [
    AuthService,
    RoutesCheckCompany,
    RoutesGuardCorp,
    ServerService,
    CookieService,
    AlertService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
