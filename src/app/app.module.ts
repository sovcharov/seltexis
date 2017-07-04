import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

//modules and services
import { RoutesModule } from './router/routes.module';
import { AuthService } from './services/auth.service'
import { RoutesGuardGlobal } from './router/routes-guard-global.service'
import { RoutesGuardCorp } from './router/routes-guard-corp.service'
import { ServerService } from './services/server.service';

//components
import { AppComponent } from './app.component';
import { LoginComponentCorp } from './corp/auth/login/login.component';
import { LoginComponentGlobal } from './global/auth/login/login.component';
import { SalesComponent } from './corp/main/trade/sales/sales.component';
import { PurchasesComponent } from './corp/main/trade/purchases/purchases.component';
import { HomeComponent } from './corp/main/trade/home/home.component';
import { TradeComponent } from './corp/main/trade/trade.component';
import { StoreComponent } from './corp/main/store/store.component';
import { MainComponent } from './corp/main/main.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentCorp,
    LoginComponentGlobal,
    SalesComponent,
    PurchasesComponent,
    HomeComponent,
    TradeComponent,
    StoreComponent,
    MainComponent
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
