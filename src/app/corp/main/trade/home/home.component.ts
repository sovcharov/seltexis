import { Component, OnInit } from '@angular/core';
import { Tabs } from '../../../../services/tabs.service'
import { UserService } from '../../../../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tabs: Tabs, private userService: UserService) { }

  ngOnInit() {

  }

  public openTab(name, id) {
    this.tabs.openTab(name, id);
  }

}
