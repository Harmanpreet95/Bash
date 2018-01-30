import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-modald',
  templateUrl: 'modald.html'
})
export class ModaldPage {
  postId: any;
  create: any;
  package: any;
  paid_data: any;
  paid_advertisement: any;
  status: any;
  txnid: any;
  advPrice: any;
                            public Loading=this.loadingCtrl.create({
                                  content: 'Processing...'
                                  
                                });
  constructor(public navCtrl: NavController,private payPal: PayPal,public viewCtrl: ViewController , public navParams : NavParams,public alertCtrl: AlertController,public toastCtrl: ToastController,public loadingCtrl:LoadingController,public appsetting: Appsetting, public http:Http) {
        this.advPrice = this.navParams.get('Price');
        console.log(this.advPrice);
        console.log(JSON.parse(localStorage.getItem('Paid_adv')));
       
        this.paid_data = JSON.parse(localStorage.getItem('Paid_adv'));
        console.log(this.paid_data.created_by);
        this.create = this.paid_data.created_by;
        console.log(this.paid_data.package_id);
        this.package = this.paid_data.package_id;
        
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

paypal(){
//  alert("pay");

                          this.Loading.present();
  // alert(this.advPrice);
      this.payPal.init({
  PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  PayPalEnvironmentSandbox: 'AQjBLWfWehnq_LiQ3J6pkP_fFzyjP3ehdUqOQLyD9xv8WederD9wq_OQdoufiozOI6PE_1o_UJNNMLmr'
}).then(() => {
  // alert("pay2");
  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    // Only needed if you get an "Internal Service Error" after PayPal login!
    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  })).then(() => {
    //  alert("pay31");
    // alert(JSON.stringify(this.advPrice));
    // alert(this.advPrice);
    let payment = new PayPalPayment(this.advPrice, 'USD', 'Description', 'sale');
    this.payPal.renderSinglePaymentUI(payment).then((data) => {
      // alert("harman");
      this.txnid = data.response.id;
      // alert(this.txnid);
      // alert(JSON.stringify(this.txnid));
    // Loading.dismiss();


                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    let options= new RequestOptions({ headers: headers });
                    var serialized_objj = this.serializeObj(this.paid_data); 
                    console.log(serialized_objj);
                    var urlpost:string = this.appsetting.myGlobalVar + 'en/account/api_addpost';
                    // var serialized_objj = this.serializeObj(this.paid_data); 
                    // console.log(serialized_objj);
                    this.http.post(urlpost ,serialized_objj, options).map(res=>res.json()).subscribe(data=>{
                                        // Loading.dismiss();
                                        // alert(data);
                                        // alert(JSON.stringify(data));
                
                    if(data.error == 0){
                      this.postId = data.insert_post_id;
                      // alert(this.postId)
                                              // this.navCtrl.push(MainPage);
                                            //   let alert = this.alertCtrl.create({
                                            //   title: 'AMAZING!',
                                            //   message: 'Advertisement Posted Successfully',
                                            //   cssClass:'alrt',
                                            //   buttons: ['OK']
                                            // });
                                            // alert.present();
                                  var data_pay = {
                                    userid : this.create,
                                    transactionid : this.txnid,
                                    price : this.advPrice,
                                    packageid : this.package,
                                    postid : this.postId
                                  }
                                  // alert(JSON.stringify(data_pay));
                    var serializ = this.serializeObj(data_pay); 
                    console.log(serializ);
                    var urlenpost:string = this.appsetting.myGlobalVar + 'en/account/api_paymentsucces';     this.http.post(urlenpost ,serializ, options).map(res=>res.json()).subscribe(dataa=>{
                      // alert("suceess");
                      // alert(JSON.stringify(dataa));
                      this.Loading.dismiss();
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                                            
                      this.navCtrl.push(MainPage);                    
                                        })
                                      }
                                      })
                                  
                    //                 }       
                   
    //   alert("harman");
    //   alert(JSON.stringify(data));
    // alert(JSON.stringify(payment))
    //  alert(JSON.stringify(data))
    //   this.txnid = data.response.id;
     // alert(this.txnid)
     
      // this.status = 1;
      // Successfully paid

      // Example sandbox response
      //
      // {
      //   "client": {
      //     "environment": "sandbox",
      //     "product_name": "PayPal iOS SDK",
      //     "paypal_sdk_version": "2.16.0",
      //     "platform": "iOS"
      //   },
      //   "response_type": "payment",
      //   "response": {
      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
      //     "state": "approved",
      //     "create_time": "2016-10-03T13:33:33Z",
      //     "intent": "sale"
      //   }
      // }
    }, () => {
      // Error or render dialog closed without being successful
    });
  }, () => {
    // Error in configuration
  });
}, () => {
  // Error in initialization, maybe PayPal isn't supported or something else
});
}
}
