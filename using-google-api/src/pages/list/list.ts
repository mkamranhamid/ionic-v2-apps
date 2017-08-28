import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AddPage } from '../add/add';

import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {


  places: { title: string }[] = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private placesService: PlacesService) {
    console.log('LIST CONSTRUCTOR');
  }

  ionViewWillEnter() {
    /* this.placesService.getPlace()
      .then((places) => {
        this.places = places;
      }) */
      this.places = this.placesService.getPlace();
  }

  itemSelected(place) {
    // this.navCtrl.push(HomePage,place);
    this.modalCtrl.create(HomePage, place).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  addMarker() {
    this.navCtrl.push(AddPage)
  }
}
