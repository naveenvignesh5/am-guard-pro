import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NativeMapPage } from './native-map';

@NgModule({
  declarations: [
    NativeMapPage,
  ],
  imports: [
    IonicPageModule.forChild(NativeMapPage),
  ],
})
export class NativeMapPageModule {}
