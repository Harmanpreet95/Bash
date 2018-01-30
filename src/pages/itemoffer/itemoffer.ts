import { Component } from '@angular/core';

import { ModalcPage } from '../modalc/modalc';
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
      import { ChatUsersPage } from '../chatUsers/chatUsers';
@Component({
  selector: 'page-itemoffer',
  templateUrl: 'itemoffer.html'
})
export class ItemofferPage {
  package: any;
  public offer = '';

    offer_para: any;
    created_by_post: any;
    url_pic: string;
    showUsersOffer: any;
    showcount: any;
  image: any;
  posted: any;
  name: any;
  price: any;
  singleItem: any;
  uid: string;
  Post_id: any;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public alertCtrl: AlertController, public navParams: NavParams,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
           this.showoffers();
           this.showalloffer();
            this.url_pic = 'http://rakesh.crystalbiltech.com/ads/uploads/profile_photos/'
  }

serializeObj(obj){
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}

presentModal() {
    let modal = this.modalCtrl.create(ModalcPage);
    modal.present();
  }
showalloffer(){
let Loading = this.loadingCtrl.create({
                content: 'Please wait...'
                                              
            });
            Loading.present();
 let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var url  : string = this.appsetting.myGlobalVar + 'en/account/api_allpostoffer';
            var allOffers = {
                 post_id : this.Post_id,
                 type : 0
            }
          var serial_offers = this.serializeObj(allOffers); 
          console.log(serial_offers);
          this.http.post(url ,serial_offers, options).map(res=>res.json()).subscribe(data=>{
              Loading.dismiss();
              console.log(data);
              if(data.error == 0){
                 console.log(data.data);
                 this.showUsersOffer = data.data;
                 let alert = this.alertCtrl.create({
                  title: '',
                  message: data.msg,
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present();
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
showoffers(){
        this.Post_id = this.navParams.get('advertise_id');

        let Loading = this.loadingCtrl.create({
                content: 'Please wait...'
                                              
            });
            Loading.present();
       

          ////////////////////////////////////////

          this.uid = localStorage.getItem("USERID");
            console.log(this.uid);
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var url  : string = this.appsetting.myGlobalVar + 'en/account/api_singlepostpage';
            var detail = {
                    id :  this.Post_id,
                    uid : this.uid
            }
          var serial_detail = this.serializeObj(detail); 
          console.log(serial_detail);
          this.http.post(url ,serial_detail, options).map(res=>res.json()).subscribe(data=>{
              Loading.dismiss();
              console.log(data);
              if(data.error == 0){
                    // this.singleItem = data.searchresult;
                    this.name = data.searchresult.title;
                    this.price = data.searchresult.price;
                    this.posted = data.searchresult.activation_date;
                    this.image = data.searchresult.gallery[0].image;
                    this.created_by_post = data.searchresult.created_by;
                    this.package = data.searchresult.packagetitle;
            var urlcount  : string = this.appsetting.myGlobalVar + 'en/account/api_seepost_alloffer';
            var count = {
                    post_id :  this.Post_id,
                 
            }
          var serial_count = this.serializeObj(count); 
          console.log(serial_count);
          this.http.post(urlcount ,serial_count, options).map(res=>res.json()).subscribe(datares=>{
              Loading.dismiss();
              console.log(datares);
            
                this.showcount = datares.data;
                console.log(this.showcount);
              
        
          })
              }
          })
}
recent(offer_para){
            console.log(offer_para);
           console.log(offer_para)
           this.offer = offer_para;
            this.Post_id = this.navParams.get('advertise_id');

            let Loading = this.loadingCtrl.create({
                content: 'Please wait...'
                                              
            });
            Loading.present();
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var urlbytype  : string = this.appsetting.myGlobalVar + 'en/account/api_allpostoffer';
            var alltypes = {
                  type : this.offer,
                  post_id : this.Post_id
                
            }
          var serial_bytype = this.serializeObj(alltypes); 
          console.log(serial_bytype);
          this.http.post(urlbytype ,serial_bytype, options).map(res=>res.json()).subscribe(data=>{
              Loading.dismiss();
              console.log(data);
              if(data.error == 0)
            {
                 this.showUsersOffer = data.data;
                //  let alert = this.alertCtrl.create({
                //   title: '',
                //   message: data.msg,
                //   cssClass:'alrt',
                //   buttons: ['OK']
                // });
                // alert.present();  
            } else{
               
            } 
          },error => {

        // alert('error');
        alert(error);
        console.log('Error: ' + error);
      }
      );
}
chat(userIdOffer,name){
  console.log(name);
    this.navCtrl.push(ChatUsersPage,{login_user_id : userIdOffer ,postname : name ,postadv :  this.Post_id,creat_user : this.created_by_post});
}
offer_del(user_id){
    this.Post_id = this.navParams.get('advertise_id');
    // alert(user_id);
     let Loading = this.loadingCtrl.create({
                content: 'Please wait...'
                                              
            });
            Loading.present();
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var urlbytype  : string = this.appsetting.myGlobalVar + 'en/account/api_offer_ignore';
            var del_offer = {
                  user_id : user_id,
                  post_id : this.Post_id
                
            }
          var serial_bytype = this.serializeObj(del_offer); 
          console.log(serial_bytype);
          this.http.post(urlbytype ,serial_bytype, options).map(res=>res.json()).subscribe(data=>{
              Loading.dismiss();
              console.log(data);
              if(data.error == 0)
            {
                 this.showUsersOffer = data.data;
                 let alert = this.alertCtrl.create({
                  title: '',
                  message: data.msg,
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present(); 
                      this.showoffers();
           this.showalloffer(); 
            } else{
                let alert = this.alertCtrl.create({
                  title: '',
                  message: data.msg,
                  cssClass:'alrt',
                  buttons: ['OK']
                });
                alert.present(); 
            } 
          },error => {

        // alert('error');
        alert(error);
        console.log('Error: ' + error);
      }
      );

}
}
