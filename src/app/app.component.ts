import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AlertsComponent } from './corp/alerts/alerts.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

  }


}
