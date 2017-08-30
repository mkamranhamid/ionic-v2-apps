import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { SignupPage } from '../signup/signup';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
   /*  fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res)
    })
    .catch(e => {
      console.log('Error logging into Facebook', e)
    }); */
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmitLoginForm(f){
    console.log('f ',f);
  }

  showSignup(){
    this.navCtrl.push(SignupPage);
  }
}
