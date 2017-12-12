import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { Postlist } from '../pages/postlist/postlist';
import { Categorylist } from '../pages/categorylist/categorylist';
import { Authorlist } from '../pages/authorlist/authorlist';
import { TabsPage } from '../pages/tabs/tabs';
import { Post } from '../pages/post/post';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    Postlist,
    Categorylist,
    Authorlist,
    TabsPage,
	Post
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Postlist,
    Categorylist,
    Authorlist,
    TabsPage,
	Post
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
