import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = TabsPage;
  
  pages: Array<{title: string, component: any, index: string, icon_name: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Публикации', component: TabsPage, index: '0', icon_name: 'ios-paper-outline' },
      { title: 'Категории', component: TabsPage, index: '1', icon_name: 'ios-albums-outline' },
      { title: 'Авторы', component: TabsPage, index: '2', icon_name: 'ios-contacts-outline' }
    ];
	
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component, {index: page.index});
  }
  
}
