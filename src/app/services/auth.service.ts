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
          if (response) {
            this.companyService.company = response;
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


  logIn(user, callback) {
    this.serverService.logInUser(user.email, user.password, this.companyService.company.id)
      .subscribe(
      (response) => {
        // this.user.name = response.data.Users[0].name;
        console.log(response);
        if (response) {
          this.userService.user = response;
          this.userService.user.authenticated = true;
          callback(true);
        } else {
          callback(false);

        }
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
