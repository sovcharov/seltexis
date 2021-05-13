import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// import { Routes, RouterModule } from '@angular/router';
// import { AlertModule } from 'ngx-bootstrap';
// import { HttpModule } from '@angular/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { RecaptchaModule } from 'ng-recaptcha';
// import {NgxImageCompressService} from 'ngx-image-compress';

// import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//modules and services
import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';
import { RoutesModule } from './router/routes.module';
import { AuthService } from './services/auth.service'
import { RoutesCheckCompany } from './router/routes-check-company.service'
import { RoutesGuardCorp } from './router/routes-guard-corp.service'
import { ServerService } from './services/server.service';
import { AlertService } from './services/alert.service';
import { MyCookieService } from './services/my-cookie.service';
import { SecurityService } from './services/security.service';
import { Tabs } from './services/tabs.service';
import { InventoryService } from './services/inventory.service';
import { ConfigService } from './services/config.service';
import { LoadAnimationService } from './services/load-animation.service';
// import { IconService } from './services/icon.service';


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

import { ErrorComponent } from './corp/auth/error/error.component';
import { ServiceComponent } from './corp/main/trade/service/service.component';
import { InventoryComponent } from './corp/main/trade/inventory/inventory.component';
import { InventoryChangeComponent } from './corp/main/trade/inventory/inventory-change/inventory-change.component';
import { ManufacturersComponent } from './corp/main/trade/inventory/manufacturers/manufacturers.component';
import { AnalogsComponent } from './corp/main/trade/inventory/analogs/analogs.component';
import { PriceListComponent } from './corp/main/trade/inventory/price-list/price-list.component';
import { ItComponent } from './corp/main/trade/it/it.component';
import { PermalinkComponent } from './corp/main/trade/it/permalink/permalink.component';
import { SitemapComponent } from './corp/main/trade/it/sitemap/sitemap.component';
import { LoadAnimationComponent } from './corp/load-animation/load-animation.component';
import { IcImageComponent } from './corp/main/trade/inventory/inventory-change/ic-image/ic-image.component';
import { QuoteComponent } from './corp/main/trade/sales/quote/quote.component';



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
    AlertsComponent,
    ErrorComponent,
    ServiceComponent,
    InventoryComponent,
    InventoryChangeComponent,
    ManufacturersComponent,
    AnalogsComponent,
    PriceListComponent,
    ItComponent,
    PermalinkComponent,
    SitemapComponent,
    LoadAnimationComponent,
    IcImageComponent,
    QuoteComponent
  ],
  imports: [
    // AlertModule.forRoot(),
    CookieModule.forRoot(),
    BrowserModule,
    FormsModule,
    RoutesModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    // HttpModule,
    Ng2ImgMaxModule,
    RecaptchaModule
  ],
  providers: [
    CompanyService,
    UserService,
    AuthService,
    RoutesCheckCompany,
    RoutesGuardCorp,
    ServerService,
    // CookieService,
    AlertService,
    MyCookieService,
    SecurityService,
    Tabs,
    InventoryService,
    ConfigService,
    // NgxImageCompressService,
    LoadAnimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
