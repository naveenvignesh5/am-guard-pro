import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  private call:CallNumber) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
      this.loadAllData();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        if(search == '' || !this.data) this.loadAllData();
        else this.loadPinData(search);
      });
  }

  loadAllData() {
    this.db.loadData().subscribe(d => {
      this.data = d;
    })
  }

  loadPinData(ev:any) {
    if(ev && ev.trim() != ''){
      this.data = this.data.filter((item)=>{
        return item.pincode.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      });
    }
  }

  callno(phone) {
    this.call.callNumber(phone,true);
  }
}
