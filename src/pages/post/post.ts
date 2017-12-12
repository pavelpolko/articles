import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class Post {
	
  selectedItem: any;
  postphotos: any;
  post_category: any;
  post_author: any;
  post_author_id: any;
  post_author_img: any;
  post_title: any;
  post_dat3: any;
  post_intro_text: any;
  post_full_text: any;
  post_img: any;
  post_is_photo: any;
  post_error: string;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
	
    this.loadData();
  }

  loadData() {
      // Создаем окно загрузки
      let loadingPopup = this.loadingCtrl.create({
        content: ''
      });

      // Показываем окно загрузки
      loadingPopup.present();	
	
      // Получение данных, с указание URL-запроса и параметров
      this.http.get('https://forpes.ru/web/frps/post.php?p='+this.selectedItem.id)
	    .timeout(20000)
        .map(res => res.json())
        .subscribe(
          data => {

            setTimeout(() => {
              this.postphotos = data.data;
              this.post_category = data.category;
              this.post_author = data.author
              this.post_author_id = data.author_id;
              this.post_author_img = data.author_img;
              this.post_title = data.title;
              this.post_dat3 = data.dat3;
              this.post_intro_text = data.intro_text;
              this.post_full_text = data.full_text;
              this.post_img = data.img;
              this.post_is_photo = data.is_photo;
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
    console.log('ionViewDidLoad Post');
  }

}
