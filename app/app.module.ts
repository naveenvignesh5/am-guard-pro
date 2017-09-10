import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http } from '@angular/http';
import {HttpModule} from '@angular/http';

import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';

import { MyApp } from './app.component';
import { DbutilProvider } from '../providers/dbutil/dbutil';

// export function createTranslateLoader(http: Http) {
//   return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist:false
    }),
    // SuperTabsModule.forRoot(),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [Http]
    //   }
    // }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    Network,Geolocation,CallNumber,
    StatusBar,SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbutilProvider
  ]
})
export class AppModule {}
