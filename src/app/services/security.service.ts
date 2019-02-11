import { Injectable } from '@angular/core';

import { CompanyService } from './company.service';
import { UserService } from './user.service';

@Injectable()

export class SecurityService {
  myInterval;

  constructor(
    private companyService: CompanyService,
    private userService: UserService
  ) { }

  startCheckUser() {
    this.myInterval = setInterval(() => {
      this.userService.checkUserLoggedIn();
    }, 60000);
  }

  stopCheckUser() {
    clearInterval(this.myInterval);
  }

}
