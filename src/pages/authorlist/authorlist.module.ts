import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Authorlist } from './authorlist';

@NgModule({
  declarations: [
    Authorlist,
  ],
  imports: [
    IonicPageModule.forChild(Authorlist),
  ],
})
export class AuthorlistModule {}
