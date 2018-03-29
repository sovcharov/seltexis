import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Tabs } from '../../../services/tabs.service'



@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    public tabs: Tabs
  ) {
  }

  ngOnInit() {
  }

  openTab(tabName, id) {
    this.tabs.openTab(tabName, id);
  }

  closeTab(index) {
    this.tabs.closeTab(index);
  }

}
