import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {DbutilProvider} from '../../providers/dbutil/dbutil';
import { CallNumber } from '@ionic-native/call-number';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {

  data:any;
  query:string = '';
  searchControl:FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DbutilProvider,
  private call:CallNumber, private actionSheetCtrl:ActionSheetController) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
      this.loadAllData();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        if(search == '' || !this.data) this.loadAllData();
        else this.loadQueryData(search);
      });
  }

  CallSheet() {
    let sheet = this.actionSheetCtrl.create({
      title:'Emergency Ambulance Service',
      buttons: [
        {
          text:'Call 108',
          icon:'call',
          handler: () => {
            this.call.callNumber('108',true);
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
  loadAllData() {
    this.db.loadData().subscribe(d => {
      this.data = d;
    })
  }

  loadQueryData(ev:any) {
    if(ev && ev.trim() != ''){
      this.data = this.data.filter((item)=>{
        if(!isNaN(ev)) return item.pin.toLowerCase().indexOf(ev.toLowerCase()) > -1;
        else return item.name.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      });
    }
  }

  callno(phone) {
    this.call.callNumber(phone,true);
  }
}
