import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ServerService {
  constructor(private http: Http) { }

  getUserInfo(user: any) {
    return this.http.get('http://localhost:5555/api/test');
  }

  checkCompany(company: any) {
    return this.http.get(`http://localhost:5555/api/company/exists/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }
}
