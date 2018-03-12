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

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) {
    this.main = [{
      name: 'Home',
      href: `/${companyService.company.name}`
    }
    ];
    this.tabsVisitingOrder = [`/${companyService.company.name}`]
  }


  addTab(name, href) {
    href = `/${this.companyService.company.name}/${href}`;
    let inTabs: boolean = false;
    // console.log(href, name);
    for (let i: number = 0; i < this.main.length; i += 1) {
      if (this.main[i].href === href) {
        inTabs = true;
        this.tabsVisitingOrder.splice(i, 1);
        this.tabsVisitingOrder[this.tabsVisitingOrder.length] = href;

      }
    }
    if (!inTabs) {
      this.main[this.main.length] = { name: name, href: href };
      this.tabsVisitingOrder[this.tabsVisitingOrder.length] = href;
    }
    // console.log(href)
    console.log(this.tabsVisitingOrder);
    this.router.navigate([href]);
  }

  closeTab(i) {
    let href = this.main[i].href;
    this.main.splice(i, 1);
    for (let j: number = 0; j < this.tabsVisitingOrder.length; j += 1) {
      if (this.tabsVisitingOrder[j] === href) {
        this.tabsVisitingOrder.splice(j, 1);
      }
    }
    this.router.navigate([this.tabsVisitingOrder[this.tabsVisitingOrder.length-1]]);
  }

  changeOrder(tab) {
    for (let i: number = 0; i < this.tabsVisitingOrder.length; i += 1) {
      if (this.tabsVisitingOrder[i] === tab.href) {
        this.tabsVisitingOrder.splice(i, 1);
        console.log(i, this.tabsVisitingOrder);
        this.tabsVisitingOrder[this.tabsVisitingOrder.length] = tab.href;
      }
    }
    console.log(this.tabsVisitingOrder);

  }



}
