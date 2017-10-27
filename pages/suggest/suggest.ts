import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import {hospital} from '../../models/app.models';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';

@IonicPage()
@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
})
export class SuggestPage {

  private hospitalObj = {} as  hospital;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:FirebaseDbProvider,private toastCtrl:ToastController) 
  {

  }

  sendSuggestion() {
   if(this.hospitalObj.name && this.hospitalObj.address && this.hospitalObj.phone && this.hospitalObj.pin)	
  	 this.db.addSuggestion(this.hospitalObj).then((res)=>{
  	 	if(res) this.toast('Inserted');
  	 },err => {
  	 	this.toast('Unable to insert');
  	 	this.hospitalObj = null;
  	 });	
   else this.toast('Enter all credentials');
  }  
  
  toast(msg) {
  	let  t = this.toastCtrl.create({message:msg,duration:2500,position:'bottom'});
  	t.present();
  }
}
