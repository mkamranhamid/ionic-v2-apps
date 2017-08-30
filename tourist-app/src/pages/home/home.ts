import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import { AddPage } from '../add/add';
import { DropPointPage } from '../drop-point/drop-point';

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
  coordinates: { lat: number, lng: number };
  infoWindow: any;
  fromLocation: any;

  constructor(public navParams: NavParams, public navCtrl: NavController, public geolocation: Geolocation, public viewCtrl: ViewController, private placesService: PlacesService, private cdRef: ChangeDetectorRef) {

  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(geoLoc?: { lat: string, lng: string }) {
    if (geoLoc) {
      let latLng = new google.maps.LatLng(geoLoc.lat, geoLoc.lng);
      this.currentPosition = latLng;
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeControl: false,
        scaleControl: true,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    } else {
      this.geolocation.getCurrentPosition().then((position) => {
        var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };

        let parentPromise = new Promise((resolve, reject) => {
          this.getLocationStringByLatLng(latlng, resolve, reject)
        })
        parentPromise.then(d => {
          console.log('d ', d);
          this.fromLocation = d['formatted_address'];
        }, err => {
          console.log(err);
        })
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.currentPosition = latLng;
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeControl: false,
          // scrollwheel: false,
          disableDoubleClickZoom: true,
          fullscreenControl: false,
          zoomControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker('Point A');
      }, (err) => {
        console.log(err);
      });
    }
  }

  onDismiss() {
    this.viewCtrl.dismiss()
  }

  addMarker(markerStr) {

    let marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = `<h4> ${markerStr} </h4>`;

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    this.infoWindow = new google.maps.InfoWindow({
      content: content
    });


    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.open(this.map, marker);
    });
    google.maps.event.addListener(marker, 'dragend', (marcador) => {
      console.log('marcador ', marcador, 'lat', marcador.latLng.lat(), 'lng', marcador.latLng.lng());
      var latlng = { lat: parseFloat(marcador.latLng.lat()), lng: parseFloat(marcador.latLng.lng()) };
      let markerPromise = new Promise((resolve, reject) => {
        this.getLocationStringByLatLng(latlng, resolve, reject)
      })
      markerPromise.then((succes) => {
        console.log('success ', succes);
        this.fromLocation = succes['formatted_address'];
        this.cdRef.detectChanges();
        console.log('this.fromLocationthis.fromLocationthis.fromLocation', this.fromLocation)
      }).catch((errFetchingLocation) => {
        console.log('errFetchingLocation ', errFetchingLocation);
      })
    });
  }

  getLocationStringByLatLng(latlng, resolve, reject) {
    let geocoder = new google.maps.Geocoder;
    // var latlng = { lat: parseFloat(latlong.lat()), lng: parseFloat(latlong.lng()) };
    this.coordinates = latlng;
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      console.log('results ', results, ' status ', status);
      if (status === 'OK') {
        if (results[0]) {
          // this.map.setZoom(11);
          resolve(results[0]);
          /* let mapOptions = {
            center: latlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          var marker = new google.maps.Marker({
            position: latlng,
            map: this.map
          });
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
          this.infoWindow.setContent(results[0].formatted_address);
          this.infoWindow.open(this.map, marker); */
        } else reject("no result found");
      } else reject("status not ok");
    })
  }

  enviarParaASP() {
    console.log('marcador ');
    this.navCtrl.push(DropPointPage,{from:this.coordinates})
  }

}