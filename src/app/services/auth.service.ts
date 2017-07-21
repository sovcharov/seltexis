
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable()
export class AuthService {

  constructor(private serverService: ServerService) {}

  user = {
    name: undefined,
    lastName: undefined,
    id: undefined,
    token: undefined,
    authenticated: true,
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
            if(response) {
              console.log(response.json());
              resolve(true)
            }
          },
          (error) => {
            console.log("Error: " + error);
            resolve(true);
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
