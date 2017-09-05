import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class DbutilProvider {

  constructor(public http: Http,private platform:Platform) {
  }

  loadData() {
    var url = 'assets/hospital/hospitalData.json';
    if(this.platform.is('cordova') && this.platform.is('android')) {
      url = 'file:///android_asset/www/assets/hospital/hospitalData.json';
    }
    return this.http.get(url).map(res => res.json());
  }

  sendFeedback(msg) {
    return this.http.get('').map(res => res.json());
  }

}
