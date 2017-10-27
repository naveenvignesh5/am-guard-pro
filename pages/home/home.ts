import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  page1:any = 'OfflinePage';
  page2:any = 'MapPage';

  constructor(public navCtrl: NavController) {
  }


  gotoPage(page) {
    this.navCtrl.push(page);
  }
}
