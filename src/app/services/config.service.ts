import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable()
export class ConfigService {

  public config = {
    host: ""
  };
  
  constructor() {
    if(environment.production) {
      this.config.host = 'https://seltex.ru:3001'
    } else {
      this.config.host = 'http://localhost:3001'
    }
  }

}
