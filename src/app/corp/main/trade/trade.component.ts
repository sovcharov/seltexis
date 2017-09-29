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
    private tabs: Tabs
  ) {
  }

  ngOnInit() {
  }

  homeIsActive() {
    if (('/' + this.route.snapshot.params.company) === this.router.url) {
      return true;
    } else {
      return false;
    }
  }

  closeTab(index) {
    this.tabs.closeTab(index);
  }

}
