import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Postlist } from './postlist';

@NgModule({
  declarations: [
    Postlist,
  ],
  imports: [
    IonicPageModule.forChild(Postlist),
  ],
})
export class PostlistModule {}
