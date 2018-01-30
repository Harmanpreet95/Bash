import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {ModalCatPage} from '../modalcat/modalcat';
import {filterPage} from '../filter/filter';
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  public brightness = '';
  timecheck: void;
  filterbycat: any;
  categorylist: any;
  list: any;
  public checkValue = [];


  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public viewCtrl: ViewController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
        this.ShowCategories(); 
        console.log("fdf",this.brightness);
  }
    // ionViewDidLoad() {
    //          let modal = this.modalCtrl.create(ModalPage);
    //         modal.present();
    //         }
    serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
ShowCategories(){

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options= new RequestOptions({ headers: headers });
        var urlcat:string = this.appsetting.myGlobalVar + 'en/account/api_categorylist';
        this.http.get(urlcat , options).map(res=>res.json()).subscribe(data=>{
        console.log(data);
       
        this.list = data.categorylist;
    
      })
}

 dismiss() {
    this.viewCtrl.dismiss();
  }
selectCat(caId,$event){
  console.log($event._value);
  if($event._value == true){
       this.checkValue.push(caId);
  // this.cat = catId;

      console.log(this.checkValue);
  }else{
      let indexx = this.checkValue.indexOf(caId);
      this.checkValue.splice(indexx,1);
      console.log(this.checkValue);

  }


// this.filterbycat = this.checkValue;

}

newly(newly_posted){

  console.log(newly_posted);
  this.timecheck = newly_posted
  console.log(this.timecheck);
}


less(less_24){

  this.timecheck = less_24;
  console.log(this.timecheck);

}

week(week_1){

 this.timecheck = week_1;
  console.log(this.timecheck);

} 

month(month_1){

 this.timecheck = month_1;
  console.log(this.timecheck);

}
refresh(){
  //  this.ShowCategories(); 
  let modal = this.modalCtrl.create(ModalPage);
            modal.present();
            
}
pricefilter(event){
  console.log(event);
  console.log(this.brightness);
  this.brightness = event;
}
 filter(){
   console.log(this.brightness);
      // alert("filter");
      console.log(this.checkValue);
      this.navCtrl.push(filterPage,{category : this.checkValue,timeacc : this.timecheck , price : this.brightness});
  }
  }
