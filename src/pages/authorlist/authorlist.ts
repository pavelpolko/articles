import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoadingController } from 'ionic-angular';
import { Postlist } from '../postlist/postlist';

@Component({
  selector: 'page-authorlist',
  templateUrl: 'authorlist.html',
})
export class Authorlist {

  authorlists: any;
  authorlists_new: any;
  countElement: number = 40;
  beginElement: number = 0;
  post_error: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
	this.loadData(0);
  }

  openPostAuthorPage(item) {
    this.navCtrl.push(Postlist, { item: item, type: '2' });	
  }
  
  loadData(isNew) {
    if (isNew==0){
	  // Первоначальные значения переменных
	  this.beginElement = 0;
	  this.countElement = 40;

      // Создаем окно загрузки
      let loadingPopup = this.loadingCtrl.create({
        content: ''
      });

      // Показываем окно загрузки
      loadingPopup.present();	
	
      // Получение данных, с указание URL-запроса и параметров
      this.http.get('https://forpes.ru/web/frps/authorlist.php?begin='+this.beginElement+'&limit='+this.countElement)
	    .timeout(20000)
        .map(res => res.json())
        .subscribe(
          data => {

            setTimeout(() => {
              this.authorlists = data.data;
              this.countElement = data.count;
  			  this.post_error = "0";
              loadingPopup.dismiss();
            }, 1000);

          },
          err => {
			loadingPopup.dismiss();
			this.post_error = "1";
		  }
      );	
	  
	}else{
	  // Увеличиваем начальную позицию номера публикации для последующего получения именно с нужной позиции
	  this.beginElement = Number(this.beginElement) + Number(this.countElement);
	
	}
  }
  
  // Выполняется при пролистывании к последнему элементу списка
  doInfinite(infiniteScroll) {

	// Проверяем нужно ли выполнять запрос
	// Если в предыдущем запросе мы получили 0 публикаций,
	//   значит больше не нужно выполнять запрос для получения СЛЕДУЮЩЕГО набора данных
	if (this.countElement != 0){
      this.loadData(1);

      // Получение данных, с указание URL-запроса и параметров
      this.http.get('https://forpes.ru/web/frps/authorlist.php?begin='+this.beginElement+'&limit='+this.countElement)
	    .timeout(20000)
        .map(res => res.json())
        .subscribe(
          data => {

            setTimeout(() => {
              this.authorlists_new = data.data;
              this.countElement = data.count;
  			  this.post_error = "0";
			  
			  for (let i = 0; i < this.countElement; i++) {
			    this.authorlists.push( this.authorlists_new[i] );
			  }

			  infiniteScroll.complete();
            }, 1000);

          },
          err => console.error(err)
      );	
	
	}else{
	  infiniteScroll.complete();
	}
  }
  
  // Выполняется при потягивании списка вниз, когда список находится в верхнем положении
  doRefresh(refresher) {
    
	this.loadData(0);
    
	setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Authorlist');
  }

}
