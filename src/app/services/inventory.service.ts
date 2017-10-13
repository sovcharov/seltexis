// import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { CompanyService } from './company.service';
import { AlertService, Alert } from './alert.service';
import { UserService } from './user.service';


@Injectable()
export class AuthService {

  user;
  constructor(
    private serverService: ServerService,
    private companyService: CompanyService,
    private alertService: AlertService,
    private userService: UserService
  ) { }


  getAllInventory() {
    this.serverService.getAllInventory(this.companyService.company.id)
      .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
      );
  }


}
