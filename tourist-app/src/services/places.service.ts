import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Place } from '../model/place.model';
const googleAPIKey = 'GOOGLE_API_KEY';
@Injectable()
export class PlacesService {
    constructor(private storage: Storage, public http: Http) {

    }
    places: Place[] = [];
    addPlace(place: Place) {
        this.places.push(place);
    }
    getPlace() {
            return this.places.slice();
    }
    getMapLatLong(addr)  {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${googleAPIKey}`
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json()))
    }
}