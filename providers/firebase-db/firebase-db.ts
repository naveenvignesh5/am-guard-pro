import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseDbProvider {

  constructor(private afd:AngularFireDatabase) {
  }

  addSuggestion(obj) {
  	return this.afd.list('/suggestedHospitals/').push(obj);
  }

  addFeedback(obj) {
  	return this.afd.list('/feedbacks/').push(obj);
  }
}
