import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { LoginComponentCorp } from '../corp/auth/login/login.component';
import { LoginComponentGlobal } from '../global/auth/login/login.component';

import { MainComponent } from '../corp/main/main.component';
import { SalesComponent } from '../corp/main/trade/sales/sales.component';
import { PurchasesComponent } from '../corp/main/trade/purchases/purchases.component';
import { HomeComponent } from '../corp/main/trade/home/home.component';
import { RoutesGuardGlobal } from './routes-guard-global.service'
import { RoutesGuardCorp } from './routes-guard-corp.service';
import { TradeComponent } from '../corp/main/trade/trade.component';
import { StoreComponent } from '../corp/main/store/store.component';

const appRoutes: Routes = [
  { path: "", redirectTo: 'corp/seltex', pathMatch: 'full' },
  { path: "corp/:company", children: [
    { path: "login", component: LoginComponentCorp },
    { path: "", canActivate: [RoutesGuardCorp], component: MainComponent, children: [
      { path: "", component: TradeComponent, children: [
        { path: "", component: HomeComponent },
        { path: "sales", component: SalesComponent },
        { path: "purchases", component: PurchasesComponent }
      ]},
      { path: "store", component: StoreComponent }
    ]},
  ] },
  { path: "global", children: [
    { path: "login", component: LoginComponentGlobal },
    { path: "", canActivate: [RoutesGuardGlobal], component: MainComponent, children: [
      { path: "", component: HomeComponent },
      { path: "sales", component: SalesComponent },
      { path: "purchases", component: PurchasesComponent }
    ]},
  ] },
  { path: "**", redirectTo: "corp/seltex" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutesModule { }
