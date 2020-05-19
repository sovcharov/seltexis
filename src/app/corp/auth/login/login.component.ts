import { Component, OnInit } from '@angular/core';
// import { NgForm, EmailValidator,  } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService, Alert } from '../../../services/alert.service';
import { Company, CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';
import { LoadAnimationService } from '../../../services/load-animation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponentCorp implements OnInit {

  public captchaResponse: string = "";
  public logInForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    public companyService: CompanyService,
    private userService: UserService,
    private loadAnimationService: LoadAnimationService
  ) {
    this.logInForm = new FormGroup({
      "email": new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.pattern('^.*[.][A-Za-z]{2,10}$') //email should be with second level domain and not allowed intranet emails without subdomain
      ]),
      'password': new FormControl(null, Validators.required)
    });
  }


  ngOnInit() {
    if (this.userService.user.authenticated) {
      this.router.navigate([`/${this.route.snapshot.params.company}`]);
    }
  }


  logIn() {

    if (this.checkUserInput()) {
      let user = {
        email: this.logInForm.value.email,
        password: this.logInForm.value.password,
        captchaResponse: this.captchaResponse || "no"
      };
      this.loadAnimationService.loading = true;
      this.authService.logIn(user, (res) => {
        if (res.error) {
          let alert: Alert = {
            alertClass: 'danger',
            text: res.error,
            comment: '',
            life: 10,
            waitForClick: false
          }
          this.alertService.addAlert(alert);
          this.loadAnimationService.loading = false;
          // this.router.navigate(['/server/error']);
          // console.log(res.error);
        } else if (res.items) {
          this.userService.user = res.items;
          this.userService.user.authenticated = true;
          this.userService.saveUserCookie();
          this.loadAnimationService.loading = false;
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
          this.loadAnimationService.loading = false;
        }
      });

    };
  }

  private checkUserInput(): boolean {
    if (this.emailValid() && this.passwordValid()) {
      return true;
    } else {
      return false;
    }
  }

  checkUserAtServer(user) {
    this.router.navigate(['/main']);
    return true;
  }

  public resolved(captchaResponse: string): void {
    this.captchaResponse = captchaResponse;
  }

  public emailValid (): boolean {
    if(this.logInForm.controls.email.errors) {
      return false;
    } else {
      return true;
    }
  }

  public passwordValid (): boolean {
    if(this.logInForm.controls.password.errors) {
      return false;
    } else {
      return true;
    }
    // these lines to check for minimum password at the registration:
    // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^(){}\-+=_,.<>?:;|\[\]\\`~"'])[A-Za-z\d@$!%*?&#^(){}\-+=_,.<>?:;|\[\]\\`~"']{6,15}$/;
    // return regex.test(this.logInForm.value.password);
  }

  // public onSubmit() {
  //   console.log(this.logInForm.value);
  //   console.log(this.logInForm.controls.email.errors);
    // console.log(this.logInForm.controls.password.errors);
    // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    // console.log(regex.test(this.logInForm.value.password));
  // }

}
