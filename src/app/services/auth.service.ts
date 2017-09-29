import { Observable } from 'rxjs/Observable';
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



  company = {
    name: undefined,
    fullName: undefined
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.userService.user.authenticated);
    });
    return promise;
  };

  companyExists(company) {
    const promise = new Promise((resolve, reject) => {

      this.serverService.checkCompany(company)
        .subscribe(
        (response) => {
          if (response.error) {
            resolve(response);
          } else if (response.items) {
            this.companyService.company = response.items;
            this.companyService.saveCompanyCookie();
            resolve(response)
          } else {
            let alert: Alert = {
              alertClass: 'danger',
              text: `Wrong company`,
              comment: `${company} not exists`,
              life: 15,
              waitForClick: false
            }
            this.alertService.addAlert(alert);
            resolve(response);
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

  logIn(user, callback) {
    this.serverService.logInUser(user.email, user.password, this.companyService.company.id)
      .subscribe(
      (response) => {
        callback(response);
        // console.log(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
      );
  }


  logOut() {
    this.user.authenticated = false;
  }

}
