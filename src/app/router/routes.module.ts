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
import { ServiceComponent } from '../corp/main/trade/service/service.component';
import { InventoryComponent } from '../corp/main/trade/inventory/inventory.component';
import { InventoryChangeComponent } from '../corp/main/trade/inventory/inventory-change/inventory-change.component';
import { ManufacturersComponent } from '../corp/main/trade/inventory/manufacturers/manufacturers.component';



import { HomeComponent } from '../corp/main/trade/home/home.component';
import { TradeComponent } from '../corp/main/trade/trade.component';
import { StoreComponent } from '../corp/main/store/store.component';
import { RegisterComponent } from '../corp/auth/register/register.component';
import { RegisterCompanyComponent } from '../corp/auth/register-company/register-company.component';
import { ErrorComponent } from '../corp/auth/error/error.component';



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
              { path: "purchases", component: PurchasesComponent },
              { path: "service", component: ServiceComponent },
              {
                path: "inventory",
                children: [
                  { path: "", component: InventoryComponent },

                  { path: "manufacturers", component: ManufacturersComponent },
                  {
                    path: "change",
                    component: InventoryChangeComponent
                  }
                ]
              }
            ]
          },
          { path: "store", component: StoreComponent }
        ]
      },
    ]
  },
  { path: "new/company/register", component: RegisterCompanyComponent },
  { path: "server/error", component: ErrorComponent },
  { path: "**", redirectTo: "seltex" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutesModule { }
