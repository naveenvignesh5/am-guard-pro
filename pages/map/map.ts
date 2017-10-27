import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController,ActionSheetController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import {DbutilProvider} from '../../providers/dbutil/dbutil';
import { CallNumber } from '@ionic-native/call-number';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('alerticon') alertElement: ElementRef;

  map:any; data:any; markers:any;

  constructor(public navCtrl: NavController,private network:Network,private geolocation:Geolocation,
  private db:DbutilProvider,private callNumber:CallNumber,private actionSheetCtrl:ActionSheetController) {
    // listen to network connection and disconnection
    this.network.onDisconnect().subscribe(() => {
      console.log('No network');
      document.getElementById('map').style.opacity = '0';
      document.getElementById('alertdiv').style.opacity = '1';
    });

    this.network.onConnect().subscribe(()=>{
      document.getElementById('map').style.opacity = '1';
      document.getElementById('alertdiv').style.opacity = '0';
    });
  }

  ionViewDidLoad() {
    this.loadAllData(); //loading json data first
    this.loadMap(); //loading map with markers from json data
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

  presentHosipitalSheet(obj) {
    let sheet = this.actionSheetCtrl.create({
      title:obj.name,
      buttons:[
        {
          text:'Call Hospital',
          icon:'call',
          handler:()=>{
            console.log(obj.phone);
            this.callNumber.callNumber(obj.phone,true);
          }
        }
      ]
    });
    sheet.present();
  }

  loadMap() {
    let latLng:any = null;
    let mapOptions:any = null;
    this.geolocation.getCurrentPosition().then((data)=>{
      // console.log(data);
      latLng = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);

      mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.loadAmbulanceMarkers();

    },err=>{
       latLng = new google.maps.LatLng(-34.9290, 138.6010);
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    });
  }

  loadAmbulanceMarkers() {
    // console.log(this.data);
    for(let obj of this.data) this.addMarker(obj);
  }

  icon:any = new google.maps.MarkerImage (
    "assets/img/ambulanceIcon.png",null,null,null,
    new google.maps.Size(40,40)
  );

  addMarker(obj) {
    var ll = new google.maps.LatLng(parseFloat(obj.lat),parseFloat(obj.lng));
    var m = new google.maps.Marker({
      position: ll,map:this.map,title: obj.name
    });
    m.setIcon(this.icon);
    m.addListener('click',()=>{
      this.presentHosipitalSheet(obj);
    });
  }

  loadAllData() {
    this.db.loadData().subscribe(d => {
      this.data = d;
    })
  }
}
