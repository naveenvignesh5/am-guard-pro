import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {suggestion} from '../../models/app.models';
@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})

export class FeedbackPage {

  review = {} as suggestion;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:FirebaseDbProvider, 
  	private toastCtrl:ToastController) {}

  submitFeedback() {
    this.db.addFeedback(this.review).then((res)=>{
    	if(res) this.toast('Suggestion Sent. Thank You for your thoughts.');
    	this.navCtrl.pop();
    })
  }

  toast(msg) {
  	let t = this.toastCtrl.create({
  		message:msg,duration:2500,position:'bottom'
  	});
  	t.present();
  }
}
