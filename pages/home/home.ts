import { Component } from '@angular/core';
import { IonicPage,NavController,ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  page1:any = 'OfflinePage';
  page2:any = 'MapPage';

  constructor(public navCtrl: NavController,private actionSheetCtrl:ActionSheetController,
  private callNumber:CallNumber) {
  }

  presentCallSheet() {
    let sheet = this.actionSheetCtrl.create({
      title:'Emergency Ambulance Service',
      buttons: [
        {
          text:'Call 108',
          icon:'call',
          handler: () => {
            this.callNumber.callNumber('108',true);
          }
        }
        // {
        //   text:'Call 102',
        //   icon:'call',
        //   handler: ()=>{
        //     this.callNumber.callNumber('102',true);
        //   }
        // } npm uninstall @ngx-translate/core @ngx-translate/http-loader --save
      ]
    });
    sheet.present();
  }

  gotoPage(page) {
    this.navCtrl.push(page);
  }
}
