import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core'

import { AuthService } from '../services/auth.service'

@Injectable()
export class RoutesCheckCompany implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  };

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.companyExists(route.params.company)
      .then(
      (response: any) => {
        if (response.error) {
          this.router.navigate(['/server/error']);
          console.log(response.error);
        } else if (response.items) {
          return true;
        } else {
          if (route.params.company === 'seltex') {
            this.router.navigate(['/server/error']);
          } else {
            this.router.navigate(['/seltex/login']);
          }
        }
      }
      );
  }
}
