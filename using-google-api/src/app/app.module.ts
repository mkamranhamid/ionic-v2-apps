import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

//google map service
import { AgmCoreModule } from 'angular2-google-maps/core';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { ListPage } from '../pages/list/list';

import { PlacesService } from '../services/places.service';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    ListPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAl6YSRayfWjIASC2pyNB6izhTj2r9RK6k'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    AddPage,
    ListPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    Geolocation,
    PlacesService
  ]
})
export class AppModule { }
