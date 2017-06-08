import { Component } from '@angular/core';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  temp:string;


  checkUserInput(user) {
    return true;
  }

  checkUserAtServer(user) {
    this.temp = user.email;
    return true;
  }

}
