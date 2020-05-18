import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      "email": new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.pattern('^.*[.][A-Za-z]{2,4}$') //email should be with second level domain and not allowed intranet emails without subdomain
      ]),
      'password': new FormControl(null, Validators.required)
    });
   }

  ngOnInit() {
  }

  public emailValid (): boolean {
    if(this.registerForm.controls.email.errors) {
      return false;
    } else {
      return true;
    }
  }

  public passwordValid (): boolean {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^(){}\-+=_,.<>?:;|\[\]\\`~"'])[A-Za-z\d@$!%*?&#^(){}\-+=_,.<>?:;|\[\]\\`~"']{6,15}$/;
    return regex.test(this.registerForm.value.password);
  }

}
