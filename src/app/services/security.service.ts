import { Injectable } from '@angular/core';

import { CompanyService } from './company.service';
import { UserService } from './user.service';

@Injectable()

export class SecurityService {

  constructor(
    private companyService: CompanyService,
    private userService: UserService
  ) { }

  startCheckUser() {
    setInterval(() => {
      this.userService.checkUserLoggedIn();
    }, 10000);
  }

}
