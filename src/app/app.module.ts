import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { SalesComponent } from './main/trade/sales/sales.component';
import { PurchasesComponent } from './main/trade/purchases/purchases.component';
import { HomeComponent } from './main/home/home.component';

const domainName: string = 'localhost:4200/'
const appRoutes: Routes = [
    { path: "", component: AppComponent },
    { path: "login", component: LoginComponent },
    { path: "main", component: MainComponent, children: [
      { path: "", component: HomeComponent },
      { path: "sales", component: SalesComponent },
      { path: "purchases", component: PurchasesComponent }
    ] },


];

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
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
