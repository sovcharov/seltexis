import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { LoginComponentCorp } from '../corp/auth/login/login.component';
import { LoginComponentGlobal } from '../global/auth/login/login.component';

import { MainComponent } from '../main/main.component';
import { SalesComponent } from '../main/trade/sales/sales.component';
import { PurchasesComponent } from '../main/trade/purchases/purchases.component';
import { HomeComponent } from '../main/home/home.component';
import { RoutesGuardGlobal } from './routes-guard-global.service'
import { RoutesGuardCorp } from './routes-guard-corp.service'

const appRoutes: Routes = [
  { path: "", redirectTo: '/global', pathMatch: 'full'},
  { path: "corp/:company", children: [
    { path: "login", component: LoginComponentCorp },
    { path: "", canActivate: [RoutesGuardCorp], component: MainComponent, children: [
      { path: "", component: HomeComponent,  },
      { path: "sales", component: SalesComponent },
      { path: "purchases", component: PurchasesComponent }
    ]},
  ] },
  { path: "global", children: [
    { path: "login", component: LoginComponentGlobal },
    { path: "", canActivate: [RoutesGuardGlobal], component: MainComponent, children: [
      { path: "", component: HomeComponent,  },
      { path: "sales", component: SalesComponent },
      { path: "purchases", component: PurchasesComponent }
    ]},
  ] },
  { path: "**", redirectTo: "/global" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutesModule { }
