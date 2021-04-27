import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Injectable } from '@angular/core';
import { CompanyService } from './company.service';


@Injectable()
export class Tabs {

  main: any[];
  tabsVisitingOrder: any = [];
  active: string;

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) {
    this.main = [{
      name: 'Home',
      id: `app-home`
    }/*,{
      name: 'Аналоги',
      id: 'app-analogs'
    }*/
    ];
    this.active = this.main[0].id;

    this.tabsVisitingOrder = [this.active];
    this.tempFuncToOpenUnderConstructionPage(); //comment for production
  }

  private tempFuncToOpenUnderConstructionPage(): void {
    let name = "BatchQuote";
    let id = "app-quote";
    this.openTab(name, id);
  }

  openTab(name, id) {
    let inTabs: boolean = false;
    for (let i: number = 0; i < this.main.length; i += 1) {
      if (this.main[i].id === id) {
        inTabs = true;
        this.changeOrder(id);
      }
    }
    if (!inTabs) {
      this.main[this.main.length] = { name: name, id: id };
      this.tabsVisitingOrder[this.tabsVisitingOrder.length] = id;
    }
    this.active = id;
  }

  closeTab(i) {
    let id = this.main[i].id;
    this.main.splice(i, 1);
    for (let j: number = 0; j < this.tabsVisitingOrder.length; j += 1) {
      if (this.tabsVisitingOrder[j] === id) {
        this.tabsVisitingOrder.splice(j, 1);
      }
    }
    this.active = this.tabsVisitingOrder[this.tabsVisitingOrder.length-1];
  }

  changeOrder(id) {
    for (let i: number = 0; i < this.tabsVisitingOrder.length; i += 1) {
      if (this.tabsVisitingOrder[i] === id) {
        this.tabsVisitingOrder.splice(i, 1);
        // console.log(i, this.tabsVisitingOrder);
        this.tabsVisitingOrder[this.tabsVisitingOrder.length] = id;
      }
    }
    // console.log(this.tabsVisitingOrder);
  }

  isActive(tab) {
    if (tab == this.active) {
      return true;
    } else {
      return false;
    }
  }

}
