import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  getUserInfo(user: any) {
    return this.http.get('http://localhost:5555/api/test');
  }

  checkCompany(company: any) {
    return this.http.get(`http://localhost:5555/api/company/exists/${company}`);
  }
}
