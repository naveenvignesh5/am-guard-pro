import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule,Http} from '@angular/http';

import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';

import { MyApp } from './app.component';
import { DbutilProvider } from '../providers/dbutil/dbutil';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist:false
    }),     
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[Http]
      }
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    Network,Geolocation,CallNumber,
    StatusBar,SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbutilProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}
