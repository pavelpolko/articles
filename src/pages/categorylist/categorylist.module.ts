import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categorylist } from './categorylist';

@NgModule({
  declarations: [
    Categorylist,
  ],
  imports: [
    IonicPageModule.forChild(Categorylist),
  ],
})
export class CategorylistModule {}
