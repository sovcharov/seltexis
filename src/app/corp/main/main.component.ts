import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    this.securityService.startCheckUser();
  }

}
