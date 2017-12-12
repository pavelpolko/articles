import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoadingController } from 'ionic-angular';
import { Post } from '../post/post';

@Component({
  selector: 'page-postlist',
  templateUrl: 'postlist.html',
})
export class Postlist {

  title: string;
  categoryId: any;
  authorId: any;
  selectedItem: any;
  selectedType: string;
  postlists: any;            // данные со списком публикаций, полученные из запроса
  postlists_new: any;        // данные СЛЕДУЮЩЕГО списка публикаций, которые получаются при пролистывании списка к последнему элементу
  countElement: number = 10; // кол-во элементов, которые мы получаем из запроса
  beginElement: number = 0;  // начальный номер публикации, с которого получаем список элементов
  post_error: string;        // результат выполнения запроса 0-успешно, 1-ошибка
  
  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public navParams: NavParams) {
	this.selectedItem = navParams.get('item');	
	this.selectedType = navParams.get('type');	
	
	this.categoryId = '';
	this.authorId = '';
	
	this.title = 'Публикации';
	if (this.selectedType == '1'){
		this.title = this.selectedItem.category;
		this.categoryId = this.selectedItem.id;
	}
	
	if (this.selectedType == '2'){
		this.title = this.selectedItem.author;
		this.authorId = this.selectedItem.id;
	}
	
	// Метод получения данных из запроса
	// 0 - получаем данные с самого начала
	// 1 - получаем СЛЕДУЮЩИЕ данные по порядку
	this.loadData(0);
  }

  openPostPage(item) {
    this.navCtrl.push(Post, { item: item });	
  }  
  
  loadData(isNew) {
    if (isNew==0){
	  // Первоначальные значения переменных
	  this.beginElement = 0;
	  this.countElement = 10;
  
      // Создаем окно загрузки
      let loadingPopup = this.loadingCtrl.create({
        content: ''
      });

      // Показываем окно загрузки
      loadingPopup.present();	
	
      // Получение данных, с указание URL-запроса и параметров
      this.http.get('https://forpes.ru/web/frps/postlist.php?begin='+this.beginElement+'&limit='+this.countElement+'&c='+this.categoryId+'&a='+this.authorId)
	    .timeout(20000)   // Ставим лимит на получение запроса и прерываем запрос через 20 сек.
        .map(res => res.json())
        .subscribe(
          data => {

            setTimeout(() => {
              this.postlists = data.data;     // Данные получены, записываем их
              this.countElement = data.count; // Записываем кол-во полученных публикаций
  			  this.post_error = "0";          // Результат - успешно
              loadingPopup.dismiss();         // Убираем окно загрузки
            }, 1000);

          },
          err => {
			loadingPopup.dismiss();           // Убираем окно загрузки
			this.post_error = "1";            // Результат - ошибка
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
      this.http.get('https://forpes.ru/web/frps/postlist.php?begin='+this.beginElement+'&limit='+this.countElement+'&c='+this.categoryId+'&a='+this.authorId)
	    .timeout(20000)
        .map(res => res.json())
        .subscribe(
          data => {

            setTimeout(() => {
              this.postlists_new = data.data;  // Записали новую порцию данных
              this.countElement = data.count;
  			  this.post_error = "0";

			  for (let i = 0; i < this.countElement; i++) {
    			this.postlists.push( this.postlists_new[i] );  // Добавили новые данные в основной массив публикаций
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
    console.log('ionViewDidLoad Postlist');
  }

}
