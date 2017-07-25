
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { CompanyService } from './company.service';
import { AlertService, Alert } from './alert.service';
import { UserService } from './user.service';


@Injectable()
export class AuthService {

  constructor(
    private serverService: ServerService,
    private companyServie: CompanyService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  user = {
    name: undefined,
    lastName: undefined,
    id: undefined,
    token: undefined,
    authenticated: false,
    rights: []
  };

  company = {
    name: undefined,
    fullName: undefined
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.user.authenticated);
    });
    return promise;
  };

  companyExists(company) {
    const promise = new Promise((resolve, reject) => {

      this.serverService.checkCompany(company)
        .subscribe(
        (response) => {
          if (response) {
            this.companyServie.company = response;
            // console.log(this.companyServie.company);
            resolve(true)
          } else {
            let alert: Alert = {
              alertClass: 'danger',
              text: `Wrong company`,
              comment: `${company} not exists`,
              life: 15,
              waitForClick: false
            }
            this.alertService.addAlert(alert);
            resolve(false);
          }
        },
        (error) => {
          console.log("Error: " + error);
          resolve(false);
        }
        );
    });
    return promise;


  }


  logIn(user) {
    this.serverService.getUserInfo(this.user)
      .subscribe(
      (response) => {
        // this.user.name = response.data.Users[0].name;
        console.log(response.json());

      },
      (error) => console.log(error)
      );
  }

  logOut() {
    this.user.authenticated = false;
  }

}
