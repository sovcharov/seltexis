import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Alert, AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AlertService]
})
export class AppComponent implements OnInit {
  title = 'app';
  alerts: Alert[] = [];
  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  ngOnInit() {
    this.alerts = this.alertService.alerts;
  }

}
