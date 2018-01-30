import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ModalController } from 'ionic-angular';
import { ModalbPage } from '../modalb/modalb';
import { MapPage } from '../map/map';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
// import { ModalController } from 'ionic-angular';
import {ModalImgPage} from '../modalimg/modalimg';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
declare var google;
@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html'
})
export class AdvertisePage {
  favo_var: any;
  uid: string;
  fullImg: void;
  User_id: string;
  images: any;
  public data: any = '';
  store_id: any;
  public adv = [];
                               
  // public images : any = [];
  constructor(public navCtrl: NavController,private launchNavigator: LaunchNavigator,private googleMaps: GoogleMaps,public alertCtrl: AlertController, public navParams: NavParams,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http,public modalCtrl: ModalController) {
 this.showProfile();
 
  }

    @ViewChild(Slides) slides: Slides;

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
serializeObj(obj){
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}
mpPage(address){
  console.log(address);

let options: LaunchNavigatorOptions = {
  start: 'London, ON',
  // app: LaunchNavigator.APPS.UBER
};

this.launchNavigator.navigate(address, options)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );

  // this.navCtrl.push(MapPage);
  }

 chtPage(created_by,title_post,postids){
   this.User_id = localStorage.getItem("USERID");
   
    if(this.User_id == created_by){
        let alert = this.alertCtrl.create({
                  title: '',
                  message: 'Sorry! You cannot chat on your post',
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
    }else{
    this.navCtrl.push(ChatPage,{creat_by : created_by , title : title_post , advID : postids});
    }
  }


presentModal(postid,price,created_by) {
   this.uid = localStorage.getItem("USERID");
  if(created_by == this.uid){
       let alert = this.alertCtrl.create({
                  title: '',
                  message: 'Sorry! You cannot make an offer on your post',
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
  }else{
    let modal = this.modalCtrl.create(ModalbPage,{advId : postid,advprice : price});
    modal.present();
  }
  }

showAlert(created,postid) {
this.uid = localStorage.getItem("USERID");
console.log(created);
            if(created == this.uid){
                let alert = this.alertCtrl.create({
                  title: '',
                  message: 'Sorry! You cannot favorite your post',
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
            }else{
            let Loading = this.loadingCtrl.create({
                content: 'Please wait...'
                                              
            });
            Loading.present();
            this.store_id = this.navParams.get('postid');
         
            this.uid = localStorage.getItem("USERID");
            console.log(this.uid);
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var url  : string = this.appsetting.myGlobalVar + 'en/account/api_favouritepost';
            var favorite = {
                    id :  this.store_id,
                    uid : this.uid
            }
          var serial_favo = this.serializeObj(favorite); 
          console.log(serial_favo);
          this.http.post(url ,serial_favo, options).map(res=>res.json()).subscribe(data=>{
              Loading.dismiss();
              console.log(data);
              if(data.error == 0){
                 this.showProfile();
                 if(this.favo_var == 0){
                let alert = this.alertCtrl.create({
                  title: '',
                  message: 'Added As Your Favroite',
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
                 }else{
                   let alert = this.alertCtrl.create({
                  title: '',
                  message: 'Post unfavorited',
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
                 }
              
            }else{
               let alert = this.alertCtrl.create({
                  title: '',
                  message: 'Try again',
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
            }
          },error => {
            Loading.dismiss();
        // alert('error');
        alert('Server Error');
        console.log('Error: ' + error);
      }
          );
            }
  }
 
  showProfile(){
             let Loading = this.loadingCtrl.create({
                                              content: 'Please wait...'
                                              
            });
             Loading.present();
             this.User_id = localStorage.getItem("USERID");
            console.log("show")
            this.store_id = this.navParams.get('postid');
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var url  : string = this.appsetting.myGlobalVar + 'en/account/api_singlepostpage';
            var post_id = {
                    id :  this.store_id,
                    uid : this.User_id
            }
          var serial = this.serializeObj(post_id); 
          console.log(serial);
          this.http.post(url ,serial, options).map(res=>res.json()).subscribe(data=>{
              Loading.dismiss();
                console.log(data);
                if(data.error == 0){
                   this.favo_var = data.searchresult.favourite;
                   this.data = data.searchresult;
                    this.images = data.searchresult.gallery;
                    console.log(this.images);
                    if(data.searchresult.viewhit == 0){
                       var urlenSave  : string = this.appsetting.myGlobalVar + 'en/account/api_postviews';
                        var post_ids = {
                                id :  this.store_id,
                                uid :  this.User_id
                        }
                      var serial_save = this.serializeObj(post_ids); 
                      console.log(serial_save);
                      this.http.post(urlenSave ,serial_save, options).map(res=>res.json()).subscribe(respp=>{
                            console.log(respp);
                            this.showProfile();


                          
                      })
                    }else{

                    }

                       
  }
          })
  }
fullview(imgg) {
            this.fullImg = localStorage.setItem('fullImage',imgg);
            let modal = this.modalCtrl.create(ModalImgPage);
            modal.present();
          }
  

}
