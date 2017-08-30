import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

// Facebook
import { Facebook } from '@ionic-native/facebook';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DropPointPage } from '../pages/drop-point/drop-point';

import { PlacesService } from '../services/places.service';

const firebaseConfig = {
  apiKey: "AIzaSyCLd4wOi6FQTdfbh_k_vRTtRaUaWpUNKSg",
  authDomain: "react-native-demo-c92b5.firebaseapp.com",
  databaseURL: "https://react-native-demo-c92b5.firebaseio.com",
  projectId: "react-native-demo-c92b5",
  storageBucket: "react-native-demo-c92b5.appspot.com",
  messagingSenderId: "857436581301"
}

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    ListPage,
    HomePage,
    LoginPage,
    SignupPage,
    DropPointPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    ListPage,
    HomePage,
    LoginPage,
    SignupPage,
    DropPointPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    Geolocation,
    PlacesService,
    Facebook
  ]
})
export class AppModule { }
