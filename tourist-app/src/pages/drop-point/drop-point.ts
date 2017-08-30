import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import { PlacesService } from '../../services/places.service';

/**
 * Generated class for the DropPointPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-drop-point',
  templateUrl: 'drop-point.html',
})
export class DropPointPage {

  @ViewChild('mapto') mapElement: ElementRef;
  map: any;
  inputBox: any;
  currentPosition: any;
  coordinates: { lat: number, lng: number };
  lat: number;
  lng: number;
  infoWindow: any;
  fromLocation: any;
  toLocation: any;
  disableToField: boolean = false;
  markerLength: number = 0;;
  constructor(public navParams: NavParams, public navCtrl: NavController, public geolocation: Geolocation, public viewCtrl: ViewController, private placesService: PlacesService, private cdRef: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    let geoLoc = this.navParams.get('from');
    this.loadMap(geoLoc);
  }

  loadMap(geoLoc?: { lat: string, lng: string }) {
    if (geoLoc) {
      var latlngObj = { lat: geoLoc.lat, lng: geoLoc.lng };
      let parentPromise = new Promise((resolve, reject) => {
        this.getLocationStringByLatLng(latlngObj, resolve, reject)
      })
      parentPromise.then(d => {
        console.log('d ', d);
        this.fromLocation = d['formatted_address'];
      }, err => {
        console.log(err);
      })
      let latLng = new google.maps.LatLng(geoLoc.lat, geoLoc.lng);
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
      this.addMarker('Point A', false, 'from');
    }
  }

  onDismiss() {
    this.viewCtrl.dismiss()
  }

  addMarker(markerStr, ifDragable, typeofmodel) {
    this.markerLength += 1;
    let marker = new google.maps.Marker({
      map: this.map,
      draggable: ifDragable,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = `<h4> ${markerStr} </h4>`;

    this.addInfoWindow(marker, content, typeofmodel);

  }

  addInfoWindow(marker, content, typeofmodel) {

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
        if (typeofmodel == 'from') {
          this.fromLocation = succes['formatted_address'];
        } else {
          this.toLocation = succes['formatted_address'];
        }
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
    if (this.markerLength < 2) {
      this.addMarker('Point B', true, 'to');
    }
    // this.navCtrl.push(DropPointPage)
  };

  makePolyLine() {
    this.disableToField = true;
    let flightPlanCoordinates = [
      this.coordinates,
      this.navParams.get('from')
    ];
    let flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(this.map);
  }

}
