import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Post } from './post';

@NgModule({
  declarations: [
    Post,
  ],
  imports: [
    IonicPageModule.forChild(Post),
  ],
})
export class PostModule {}
