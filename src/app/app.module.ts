import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { SalesComponent } from './main/trade/sales/sales.component';
import { PurchasesComponent } from './main/trade/purchases/purchases.component';
import { HomeComponent } from './main/home/home.component';

//modules and services
import { RoutesModule } from './router/routes.module';
import { AuthService } from './services/auth.service'
import { RoutesGuard } from './router/routes-guard.service'
import { ServerService } from './services/server.service'

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
