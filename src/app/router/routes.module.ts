import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//services
import { RoutesCheckCompany } from './routes-check-company.service'
import { RoutesGuardCorp } from './routes-guard-corp.service';

//components
import { AppComponent } from '../app.component';
import { LoginComponentCorp } from '../corp/auth/login/login.component';
import { MainComponent } from '../corp/main/main.component';
import { SalesComponent } from '../corp/main/trade/sales/sales.component';
import { PurchasesComponent } from '../corp/main/trade/purchases/purchases.component';
import { HomeComponent } from '../corp/main/trade/home/home.component';
import { TradeComponent } from '../corp/main/trade/trade.component';
import { StoreComponent } from '../corp/main/store/store.component';
import { RegisterComponent } from '../corp/auth/register/register.component';
import { RegisterCompanyComponent } from '../corp/auth/register-company/register-company.component';


const appRoutes: Routes = [
  { path: "", redirectTo: '/seltex', pathMatch: 'full' },
  {
    path: ":company",
    children: [
      { path: "login", canActivate: [RoutesCheckCompany], component: LoginComponentCorp },
      { path: "register", component: RegisterComponent },
      {
        path: "", canActivate: [RoutesGuardCorp], component: MainComponent,
        children: [
          {
            path: "", component: TradeComponent,
            children: [
              { path: "", component: HomeComponent },
              { path: "sales", component: SalesComponent },
              { path: "purchases", component: PurchasesComponent }
            ]
          },
          { path: "store", component: StoreComponent }
        ]
      },
    ]
  },
  { path: "new/company/register", component: RegisterCompanyComponent },
  { path: "**", redirectTo: "seltex" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutesModule { }
