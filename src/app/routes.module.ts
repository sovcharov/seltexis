import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { SalesComponent } from './main/trade/sales/sales.component';
import { PurchasesComponent } from './main/trade/purchases/purchases.component';
import { HomeComponent } from './main/home/home.component';

const appRoutes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, children: [
    { path: "", component: HomeComponent },
    { path: "sales", component: SalesComponent },
    { path: "purchases", component: PurchasesComponent }
  ] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutesModule { }
