import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService, Alert } from '../../../services/alert.service';
import { Company, CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponentCorp implements OnInit {

  captchaResponse: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    public companyService: CompanyService,
    private userService: UserService
  ) {
  }


  ngOnInit() {
    if (this.userService.user.authenticated) {
      this.router.navigate([`/${this.route.snapshot.params.company}`]);
    }
  }


  logIn(form: NgForm) {
    let user = {
      email: form.value.email,
      password: form.value.password,
      captchaResponse: this.captchaResponse || "no"
    };
    if (this.checkUserInput(user)) {
      this.authService.logIn(user, (res) => {
        if (res.error) {
          let alert: Alert = {
            alertClass: 'danger',
            text: 'res.error',
            comment: '',
            life: 10,
            waitForClick: false
          }
          this.alertService.addAlert(alert);
          // this.router.navigate(['/server/error']);
          // console.log(res.error);
        } else if (res.items) {
          this.userService.user = res.items;
          this.userService.user.authenticated = true;
          this.userService.saveUserCookie();
          this.router.navigate(['/' + this.route.snapshot.params.company]);
        } else {
          let alert: Alert = {
            alertClass: 'danger',
            text: 'wrong input',
            comment: 'check credentials and retry',
            life: 10,
            waitForClick: false
          }
          this.alertService.addAlert(alert);
        }
      });

    };
  }

  checkUserInput(user) {
    return true;
  }

  checkUserAtServer(user) {
    this.router.navigate(['/main']);
    return true;
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
