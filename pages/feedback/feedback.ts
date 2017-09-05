import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbutilProvider } from '../../providers/dbutil/dbutil';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})

export class FeedbackPage {
  msg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DbutilProvider) {}

  submitFeedback() {
    this.db.sendFeedback(this.msg).subscribe((data)=>{
      console.log(data);
    })
  }
}
