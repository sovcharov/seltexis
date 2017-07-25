import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService, Alert } from '../../../services/alert.service';
import { Company, CompanyService } from '../../../services/company.service';





@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponentCorp implements OnInit {

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService, private companyService: CompanyService) {
  }


  ngOnInit() {
    let alert: Alert = {
      alertClass: 'danger',
      text: 'login',
      comment: 'string',
      life: 5,
      waitForClick: true
    }
    this.alertService.addAlert(alert);
    alert.life = 12;
    alert.alertClass = 'success';
    this.alertService.addAlert(alert);
    alert.waitForClick = false;
    this.alertService.addAlert(alert);

  }

  temp: string;

  logIn(form: NgForm) {
    let user = {
      email: form.value.email,
      password: form.value.password
    };
    this.checkUserInput(user);
    // this.authService.logIn(user);
  }

  checkUserInput(user) {
    return true;
  }

  checkUserAtServer(user) {
    this.temp = user.email;
    this.router.navigate(['/main']);
    return true;
  }

}
