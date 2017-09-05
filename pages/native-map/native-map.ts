import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent ,CameraPosition,LatLng,Marker,MarkerOptions} from '@ionic-native/google-maps';
import { DbutilProvider } from '../../providers/dbutil/dbutil';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-native-map',
  templateUrl: 'native-map.html',
})
export class NativeMapPage {
  @ViewChild('map') mapElement:ElementRef;
  map: GoogleMap;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private googleMaps:GoogleMaps,private db:DbutilProvider,private geolocation:Geolocation,private toastCtrl:ToastController) {
    this.loadData();
  }

  ngAfterViewInit() {
    let loc:LatLng;

    this.initiateMap();
    // let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      this.getLocation().then(res => {
        // this.toast(res.coords);
        console.log(res.coords);
        loc = new LatLng(res.coords.latitude,res.coords.longitude);

        this.moveCamera(loc);

        this.createMarker(loc,"ME","www/assets/img/ambulanceLogo.png");

      }).catch(err => {
        console.error(err);
      });
    });

    this.loadMarkers();
  }

  loadData() {
    this.db.loadData().subscribe(d => {
      this.data = d;
    })
  }

  initiateMap() {
    let elem = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(elem);
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  moveCamera(loc:LatLng) {
    let options:CameraPosition = {
      target:loc,zoom:15,tilt:10
    }
    this.map.moveCamera(options);
  }

  createMarker(loc:LatLng,title:string,iconURL:string) {
      let markeroptions:MarkerOptions = {
        position:loc,title:title,icon:{url:iconURL}
      }
      return this.map.addMarker(markeroptions);
  }

  loadMarkers() {
    //wait for when the map is ready MAP_READY
    if(this.data) {
      this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
        for(let obj of this.data) {
          var ll = new LatLng(obj.lat,obj.lng);
          this.createMarker(ll,obj.name,'www/assets/img/ambulanceIcon.png').then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
              alert(marker.title);
            });
          });
        }
      });
    }
  }

  toast(msg) {
    let t = this.toastCtrl.create({
      message:msg,duration:2500,position:'bottom'
    });
    t.present();
  }
}
