import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListPage } from '../list/list';

import { PlacesService } from '../../services/places.service';
/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private placesService: PlacesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  onSubmitPlace(f: NgForm) {
    if(!f.value.title) {
      return
    }
    
    console.log(f.value);
    this.placesService.addPlace(f.value);
    this.navCtrl.push(ListPage);
  }

}
