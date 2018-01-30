import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { EditPage } from '../edit/edit';
import { UseraccountPage } from '../useraccount/useraccount';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  store_id: any;
  submitted = false;
    onSubmit() { this.submitted = true; }
    public data='';
    public User_id;
    data_Profile :  any;
    public base64Image: string;
    srcImage : string;
    public Loading=this.loadingCtrl.create({
        content: 'Please wait...'
        
      });
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
    // this.showProfile();
  }
serializeObj(obj){
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}
mpPage(){
    this.navCtrl.push(MapPage);
  }


edtPage(){
    this.navCtrl.push(EditPage);
  }

useraccountPage(){
    this.navCtrl.push(UseraccountPage);
  }


 showConfirm() {
    let confirm = this.alertCtrl.create({
      message:'Are You Sure, You Want To Delete?',
      cssClass:'sure',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            console.log('YES clicked');
          }
        },
        {
          text: 'NO',
          handler: () => {
            console.log('NO clicked');
          }
        }
      ]
    });
    confirm.present();
  }



}
