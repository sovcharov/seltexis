import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {

  }

}
