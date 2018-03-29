import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { Tabs } from '../../../../services/tabs.service'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public baseRoute: string;
  constructor(
    private router: Router,
    private companyService: CompanyService,
    private tabs: Tabs
  ) {

  }

  ngOnInit() {

  }

  public addTab(name, id) {
    this.tabs.openTab(name, id);
  }

}
