import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import { SecurityService } from '../../services/security.service';
import { CompanyService } from '../../services/company.service';
import { UserService } from '../../services/user.service';
import { Tabs } from '../../services/tabs.service'




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService,
    private tabs: Tabs
  ) { }

  ngOnInit() {
    this.securityService.startCheckUser();
  }

  exitApp() {
    this.securityService.stopCheckUser();
    this.userService.user.authenticated = false;
    this.userService.deleteUserCookie();
    this.router.navigate([`/${this.companyService.company.name}/login`]);
  }

}
