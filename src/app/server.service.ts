import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  getUserInfo(user: any) {
    return this.http.get('https://fir-is-5d00a.firebaseio.com/Seltex.json');//this is test for firebase
  }
}
