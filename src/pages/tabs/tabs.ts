import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Postlist } from '../postlist/postlist';
import { Categorylist } from '../categorylist/categorylist';
import { Authorlist } from '../authorlist/authorlist';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  index: string;
  
  tab1Root = Postlist;
  tab2Root = Categorylist;
  tab3Root = Authorlist;

  constructor(public navParams: NavParams) {
    this.index = navParams.get('index');

  }
}
