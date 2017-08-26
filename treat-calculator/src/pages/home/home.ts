import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {
    name1: '',
    name2: '',
  }
  get score(){
    let bothUsers = (this.user.name1 + this.user.name2).toLowerCase();
    let sum = 0;
    for(let i=0;i<bothUsers.length;i++){
      sum += bothUsers.charCodeAt(i);
    }
    return sum % 101;
  };
}
