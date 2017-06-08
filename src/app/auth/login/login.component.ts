import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor (private router: Router) {

  }
    temp:string;

    logIn(form: NgForm) {
        let user = {
            email: form.value.email,
            password: form.value.password
        };
        this.checkUserInput(user);
        this.checkUserAtServer(user);
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
