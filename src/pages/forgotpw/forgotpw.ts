import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions, URLSearchParams, QueryEncoder} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {Observable} from 'rxjs/Rx'
import {LoadingController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ForgotpwPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgotpw',
  templateUrl: 'forgotpw.html',
})
export class ForgotpwPage {

  constructor(public navParams: NavParams,public toastCtrl: ToastController,public menuCtrl:MenuController,public navCtrl: NavController, public http:Http, public loadingCtrl:LoadingController , public appsetting: Appsetting) {
	  this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpwPage');
  }
public data='';
	public Loader = this.loadingCtrl.create({    //createding a custom loader which can be used later
		dismissOnPageChange: true					
	});


  
  
  //https://rakesh.crystalbiltech.com/truelab/api/users/forgetpwd
  
	serializeObj(obj) {
			var result = [];
			for (var property in obj)
				result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

			return result.join("&");
	}
		
		
		
   forgotPwd(userEmail){
		//console.log(signup);
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		let options = new RequestOptions({ headers: headers });
		
		var url = this.appsetting.myGlobalVar + 'en/account/api_forgetpassword';
		
		var postdata = { user_email:userEmail.value.email };
		
		var serialized = this.serializeObj(postdata);
		
		console.log(" postdata"+serialized);

		//this.Loader.present();
		this.show();
		this.http.post(url, serialized, options).map(res=>res.json())
			.subscribe(data=>{
					
					//this.Loader.dismiss();
					this.hide();
					console.log(" response"  +JSON.stringify(data));
					this.data=data;
					console.log(this.data);

					 if(data.error == 0) {
						//  alert(data.msg)
						let toast = this.toastCtrl.create({
						message: data.msg,
						duration: 3000
						});
						toast.present();
				        this.navCtrl.push(HomePage);
					 } else {
						 let toast = this.toastCtrl.create({
							message: data.msg,
							duration: 3000
							});
							toast.present();
							
						//  alert(data.msg)
					 }
					
			}, err=>{
				
				   console.log("Error");
				//    this.hide();
				  // this.Loader.dismiss();
				   console.log(err);
			});
			
			
		
	 }
  
	public hide(){ 
		this.Loader.dismiss(); 
	}
	public show(){ 
		this.Loader.dismiss(); 
	}
  
  
  
nextPage(){
    this.navCtrl.push(HomePage);
  }
}
