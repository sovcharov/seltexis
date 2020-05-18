import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Tabs } from '../../../services/tabs.service'
import { faTimes } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  faTimes = faTimes;

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
