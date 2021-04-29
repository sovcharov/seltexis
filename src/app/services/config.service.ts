import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable()
export class ConfigService {

  public config = {
    production: false,
    host: ""
  };
  
  constructor() {
    if(environment.production) {
      this.config.production = true;
      this.config.host = 'https://seltex.ru:3001';
    } else {
      this.config.production = false;
      this.config.host = 'http://localhost:3001'
    }
  }

}
