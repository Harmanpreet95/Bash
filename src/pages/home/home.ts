import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ForgotpwPage } from '../forgotpw/forgotpw';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Platform } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  successdata: any;
  facebookConnectPlugin: any;
  User: any;
  userProfile: any = null;
    submitted = false;
    onSubmit() { this.submitted = true; }
    public data='';
    public Loading=this.loadingCtrl.create({
        content: 'Please wait...'
        
      });
constructor(public navCtrl: NavController,    public afAuth: AngularFireAuth,
    public platform: Platform,public splashScreen: SplashScreen,private facebook: Facebook,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
      this.splashScreen.hide();
      // console.log('LOCALSTORAGE ',localStorage.getItem("USERID"));
      // if(localStorage.getItem("USERID") != null){
      //  this.navCtrl.push(MainPage);
         
      // }
  }


  serializeObj(obj){
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}
login(form) {  
   console.log('hello')
  //  alert(this.userProfile.displayName);
  //  console.log(form.value.uname.split(' '));
  //  var name1 = form.value.uname.split(' ');
  //  alert(name1[0]);
  //  alert(name1[1]);
   this.Loading.present();
   let headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
   let options = new RequestOptions({ headers: headers });
   var url: string =  this.appsetting.myGlobalVar + 'en/account/api_login';
   var data1 = ({
     username : form.value.uname,
     password : form.value.password,
   });
   console.log(data1);
    var serialized = this.serializeObj(data1);
    console.log(serialized);
   this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {
   this.Loading.dismiss();
   console.log(data)
     if (data.error == 0)
      {
            this.data = data;
            console.log(this.data);
            // localStorage.setItem("USER_DATA", JSON.stringify(data));
            let toast = this.toastCtrl.create({
              message: data.msg,
              duration: 3000
            });
            toast.present();
            var user_id = data.data.id;
            console.log(user_id);
            localStorage.setItem("USERID", user_id);
            this.navCtrl.push(MainPage);
            form.reset();
      } else {
            this.Loading.dismiss();
            let toast = this.toastCtrl.create({
                    message: data.msg,
                    duration: 3000
                  });
                  toast.present();
             }
        },err=>{
          this.Loading.dismiss();
          alert("Server not Working........Please Check your Internet Connection and try again!");
          console.log("Error!:", err);
        });
      }


  supPage(){
    this.navCtrl.push(SignupPage);
  }

  forget(){
    this.navCtrl.push(ForgotpwPage);
  }



  facebookLogin() : firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      // alert("if");
      return this.facebook.login(['email', 'public_profile']).then(res => {
        // alert(JSON.stringify(res));
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.afAuth.auth.signInWithCredential(facebookCredential).then((success) => {
          
          // alert('Success :  '+JSON.stringify(success));
          //   return this.afAuth.auth.signInWithEmailAndPassword(signup.value.email,signup.value.password).then((success) => {
          // console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          localStorage.setItem('logIn_role', 'FB');
          localStorage.setItem('User', JSON.stringify(this.userProfile));

          this.User = localStorage.getItem('User');
          // alert('user ' + this.User);
          // alert(this.userProfile.displayName);
          console.log(this.userProfile.displayName.split(' '));
          var name1 = this.userProfile.displayName.split(' ');
          //   alert(name1[0]);
          //   alert(name1[1]);
          // alert(this.userProfile.email);
          // alert(this.userProfile.uid);
          // alert(this.userProfile.photoURL);
           let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          let options = new RequestOptions({ headers: headers });
          var url: string =  this.appsetting.myGlobalVar + 'en/account/api_fblogin';
          var data_fb = ({
            first_name : name1[0],
            last_name : name1[1],
            useremail : this.userProfile.email,
            fbid : this.userProfile.uid,
            profile_photo : this.userProfile.photoURL
          });
          //alert(data_fb);
          // alert(JSON.stringify(data_fb));
           var serialized_fb = this.serializeObj(data_fb);
           console.log(serialized_fb);
          this.http.post(url, serialized_fb, options).map(res => res.json()).subscribe(datares => {
          this.Loading.dismiss();
          // alert(JSON.stringify(datares));
          if(datares.error == 0){
          // alert(datares.msg);
           let toast = this.toastCtrl.create({
                    message: datares.msg,
                    duration: 3000
                  });
                  toast.present();
          // alert(datares.user_id);
          localStorage.setItem("USERID", datares.user_id);
          this.navCtrl.push(MainPage);
          }else{
            alert("unable to login");
          }
          })
        })
        
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
            // alert("Firebase failure: " + JSON.stringify(error));
            alert("Facebook Cannot be Connected! Try again....");
            
          });
      }).catch((error) => {
        console.log(error)
         alert("Facebook Cannot be Connected! Try again....");
        // alert("err failure: " + JSON.stringify(error));
        // this.navCtrl.push(ForgotpwPage);
      });
    } else {
   
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((success) => {
          //   return this.afAuth.auth.signInWithEmailAndPassword(signup.value.email,signup.value.password).then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
    
          this.userProfile = success;
        //  alert(this.userProfile.user.displayName);
          console.log(this.userProfile.user.displayName.split(' '));
          var name1 = this.userProfile.user.displayName.split(' ');
            // alert(name1[0]);
            // alert(name1[1]);
        //  localStorage.setItem('logIn_role', 'FB');
        //  localStorage.setItem('User', JSON.stringify(this.userProfile));

          var User = localStorage.getItem('User');
         // alert('user ' + User);

         this.navCtrl.push(MainPage);
        })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
           alert("Facebook Cannot be Connected! Try again....");
          //  this.navCtrl.push(ForgotpwPage);
          });;
    }
  }

  skip(){
         this.navCtrl.push(MainPage);
}
}
  //   alert("fblogin");
  //   this.facebook.login(['email', 'public_profile']).then( (response) => {
  //     alert("Hi HArman");
  //     alert(JSON.stringify(response));
  //     alert(response);
  //       const facebookCredential = firebase.auth.FacebookAuthProvider
  //           .credential(response.authResponse.accessToken);

  //       firebase.auth().signInWithCredential(facebookCredential)
  //       .then((success) => {
  //           alert("success");
  //           console.log("Firebase success: "+ success);
  //           this.userProfile = success;
  //           alert(JSON.stringify(this.userProfile));
  //           this.navCtrl.push(MainPage);
  //       })
  //       .catch((error) => {
  //           console.log("Firebase failure: " + JSON.stringify(error));
            
  //            this.navCtrl.push(ForgotpwPage);
  //       });

  //   }).catch((error) => { console.log(error) });
  //    this.navCtrl.push(ForgotpwPage);
  // }


