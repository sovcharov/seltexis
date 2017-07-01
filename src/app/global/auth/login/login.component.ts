import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponentGlobal {

  constructor (private router: Router, private authService: AuthService) {

  }
    temp:string;

    logIn(form: NgForm) {
        let user = {
            email: form.value.email,
            password: form.value.password
        };
        this.checkUserInput(user);
        this.authService.logIn(user);
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
