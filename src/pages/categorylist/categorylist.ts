import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoadingController } from 'ionic-angular';
import { Postlist } from '../postlist/postlist';

@Component({
  selector: 'page-categorylist',
  templateUrl: 'categorylist.html',
})
export class Categorylist {

  categorylists: any;
  post_error: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    this.loadData();
  }

  openPostCategoryPage(item) {
    this.navCtrl.push(Postlist, { item: item, type: '1' });	
  }
  
  loadData() {
      // Создаем окно загрузки
      let loadingPopup = this.loadingCtrl.create({
        content: ''
      });

      // Показываем окно загрузки
      loadingPopup.present();	
	
      // Получение данных, с указание URL-запроса
      this.http.get('https://forpes.ru/web/frps/categorylist.php')
	    .timeout(20000)
        .map(res => res.json())
        .subscribe(
          data => {

            setTimeout(() => {
              this.categorylists = data.data;
  			  this.post_error = "0";
              loadingPopup.dismiss();
            }, 1000);

          },
          err => {
			loadingPopup.dismiss();
			this.post_error = "1";
		  }
      );	
		  
  }
  
  // Выполняется при потягивании списка вниз, когда список находится в верхнем положении
  doRefresh(refresher) {
    
	this.loadData();
    
	setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Categorylist');
  }

}
