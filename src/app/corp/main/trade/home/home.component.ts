import { Component, OnInit } from '@angular/core';
import { Tabs } from '../../../../services/tabs.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tabs: Tabs) { }

  ngOnInit() {
    console.log(this.tabs.main);
  }

  public addTab(name, href) {
    this.tabs.addTab(name, href);
  }

}
