      import { Component } from '@angular/core';
      import { NavController ,NavParams} from 'ionic-angular';
      import { ViewController } from 'ionic-angular';
      import { AlertController } from 'ionic-angular';
      import { ChatPage } from '../chat/chat';
      import { ModalController } from 'ionic-angular';
      import { MapPage } from '../map/map';
      import {Http, Headers, RequestOptions} from '@angular/http';
      import { Appsetting } from '../../providers/appsetting';
      import {LoadingController} from 'ionic-angular';
      import { ToastController } from 'ionic-angular';

      @Component({
        selector: 'page-modalb',
        templateUrl: 'modalb.html'
      })
      export class ModalbPage {
        uid: string;
        Post_price: any;
        Post_id: any;
        public coloroffer = 0;

        constructor(public navCtrl: NavController,public viewCtrl: ViewController,public alertCtrl: AlertController, public navParams: NavParams,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
              this.Post_id = this.navParams.get('advId');
              this.Post_price = this.navParams.get('advprice');
              console.log(this.Post_price);
                this.uid = localStorage.getItem("USERID");
        }
      serializeObj(obj){
          var result = [];

          for (var property in obj)
              result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          return result.join("&");
      }
      dismiss() {
          this.viewCtrl.dismiss();
        }
      offer(offerprice){
        console.log(offerprice);
        if(offerprice == undefined || offerprice == ''){
                           let toast = this.toastCtrl.create({
                            message: 'Please Enter Your Price!',
                            duration: 3000,
                            position: 'middle'
                          });
                              toast.present();
        }else{
              let Loading = this.loadingCtrl.create({
                      content: 'Please wait...'
                                                    
                  });
                  Loading.present();
        this.Post_id = this.navParams.get('advId');
        this.uid = localStorage.getItem("USERID");
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                  let options= new RequestOptions({ headers: headers });
                  var url  : string = this.appsetting.myGlobalVar + 'en/account/api_makeoffer';
                  var offer_data = {
                          post_id :  this.Post_id,
                          user_id : this.uid,
                          offer_price : offerprice
                  }
                var serial_offer = this.serializeObj(offer_data); 
                console.log(serial_offer);
                this.http.post(url ,serial_offer, options).map(res=>res.json()).subscribe(data=>{
                    Loading.dismiss();
                    this.coloroffer = 1;
                    console.log(data);
                    if(data.error == 0){
                    let alert = this.alertCtrl.create({
                        title: '',
                        message: data.msg,
                        cssClass:'alrt',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.viewCtrl.dismiss();
                    }else{
                      let alert = this.alertCtrl.create({
                        title: '',
                        message: data.msg,
                        cssClass:'alrt',
                        buttons: ['OK']
                      });
                      alert.present();
                    }
                })
      }
        }
        
      }
