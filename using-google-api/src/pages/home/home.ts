import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import { AddPage } from '../add/add';

import { PlacesService } from '../../services/places.service';

declare var google;


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  inputBox: any;
  currentPosition: any;
  lat: number;
  lng: number;

  constructor(public navParams: NavParams, public navCtrl: NavController, public geolocation: Geolocation, public viewCtrl: ViewController, private placesService: PlacesService) {

  }

  ionViewWillEnter() {
    console.log('this.navParams ', this.navParams.data.title);
    let title = this.navParams.get('title');
    let dashedName: string;
    var ifSpaceExists = title.indexOf(' ') > -1;
    if (ifSpaceExists) {
      let splittedName = title.split(' ');
      title = splittedName.join('-');
    }
    this.placesService.getMapLatLong(title).subscribe((bounds) => {
      console.log('bounds ', bounds.results[0].geometry);
      let geoLoc = bounds.results[0].geometry.location;
      this.loadMap(geoLoc);
    });
    // console.log(title);

  }

  ionViewDidLoad() {
    // this.loadMap();
  }

  loadMap(geoLoc?: { lat: string, lng: string }) {
    if (geoLoc) {
      let latLng = new google.maps.LatLng(geoLoc.lat, geoLoc.lng);
      this.currentPosition = latLng;
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    } else {
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.currentPosition = latLng;
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      }, (err) => {
        console.log(err);
      });
    }
  }

  onDismiss() {
    this.viewCtrl.dismiss()

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}