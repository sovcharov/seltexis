import { MyCookieService } from './my-cookie.service';
import { Injectable } from '@angular/core';


export interface Company {
  id: number;
  name: string;
  fullName: string;
  email?: string;
}

@Injectable()
export class CompanyService {

  company: Company;

  constructor(
    private myCookieService: MyCookieService
  ) {
    let tempCompany: any = this.myCookieService.getCompany();
    if (tempCompany) {
      this.company = tempCompany;
    }
  }

  saveCompanyCookie() {
    this.myCookieService.putCompany(this.company)
  }
}
