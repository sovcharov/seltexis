
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
    type: undefined,
    token: undefined,
    authenticated: false
  };

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.user.authenticated);
    });
    return promise;
  };

  logIn(user) {
    this.serverService.getUserInfo(this.user)
    .subscribe(
        (response) => {
          // this.user.name = response.data.Users[0].name;
          console.log(response.json());
          console.log(this.user);
        },
        (error) => console.log(error)
      );
  }

  logOut() {
    this.user.authenticated = false;
  }

}
