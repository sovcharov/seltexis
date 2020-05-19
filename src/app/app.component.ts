import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private authService: AuthService,
    private router: Router,
    private iconService: IconService
  ) { }

  ngOnInit() {

  }

}
