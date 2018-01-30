import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AdvertisePage } from '../advertise/advertise';
@Component({
  selector: 'page-modal',
  templateUrl: 'modalcat.html'
})
export class ModalCatPage {
  viewsFilter: any;
  posts_time: any;
  cat_filter: any;
  category_arr: any;
  filterbycat: any;
  categorylist: any;
  list: any;
  public checkValue = [];
  public week = [];
  public month = [];
  public less24 = [];
  public posted = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
        this.filterall(); 
  }

    serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }


 dismiss() {
    this.viewCtrl.dismiss();
  }

 filterall(){
    // if(this.posts_time)


   this.category_arr = this.navParams.get('category');
  //  alert("filter")
   
   this.posts_time = this.navParams.get('timeacc');
   console.log(this.posts_time);
   if(this.posts_time == undefined){
     this.posts_time = '';
   }
  

      console.log(this.category_arr);
   this.cat_filter = this.category_arr.join('harman');
  let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options= new RequestOptions({ headers: headers });
        var urlcat:string = this.appsetting.myGlobalVar + 'en/account/api_filterpost';
         var filter_page = {
                    lat:30.7333,
                    long:76.7794,
                    category_id : this.cat_filter,
                    newly_posted : this.posts_time

            }
        var serialized_obj = this.serializeObj(filter_page); 
        console.log(serialized_obj);
        this.http.post(urlcat ,serialized_obj, options).map(res=>res.json()).subscribe(data=>{
        console.log(data);
        console.log(data.postfilter);
        this.viewsFilter = data.postfilter;
       
      })



   

 }


 detailshow(ids){
   alert(ids)
   this.navCtrl.push(AdvertisePage,{postid:ids})
 }
}
