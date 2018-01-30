import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Http, Headers, RequestOptions} from '@angular/http';
import { HomePage } from '../pages/home/home';
import { ForgotpwPage } from '../pages/forgotpw/forgotpw';
import { ListPage } from '../pages/list/list';
import { Intro } from '../pages/intro/intro';
import { SignupPage } from '../pages/signup/signup';
import { MainPage } from '../pages/main/main';
import { PostPage } from '../pages/post/post';
import { PosteditPage } from '../pages/postedit/postedit';
import { ModalPage } from '../pages/modal/modal';
import { ModalbPage } from '../pages/modalb/modalb';
import { AdvertisePage } from '../pages/advertise/advertise';
import { ChatPage } from '../pages/chat/chat';
import { ChatUsersPage } from '../pages/chatUsers/chatUsers';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { MapPage } from '../pages/map/map';
import { ProfilePage } from '../pages/profile/profile';
import { EditPage } from '../pages/edit/edit';
import { UseraccountPage } from '../pages/useraccount/useraccount';
import { NotificationPage } from '../pages/notification/notification';
import { ItemofferPage } from '../pages/itemoffer/itemoffer';
import { ModalcPage } from '../pages/modalc/modalc';
import { ModaldPage } from '../pages/modald/modald';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ModalImgPage} from '../pages/modalimg/modalimg';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import {ModalCatPage} from '../pages/modalcat/modalcat';
import {filterPage} from '../pages/filter/filter';
import {PaymentPage} from '../pages/payment/payment';
import {paidPostPage} from '../pages/paidPost/paidPost';

import { MainSearchPage } from '../pages/mainSearch/mainSearch';
// import {GoogleplaceDirective} from 'angular2-google-map-auto-complete/directives/googleplace.directive';
@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  alert: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Intro;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private menu: MenuController,private launchNavigator: LaunchNavigator,public toastCtrl: ToastController,public alertCtrl: AlertController,public statusBar: StatusBar, public splashScreen: SplashScreen) {
    // this.LoadPage();

    this.initializeApp();
     this.menu.swipeEnable(false);
    firebase.initializeApp({
    apiKey: "AIzaSyDPXU1IQb-XUp1lbxE_WvBKgj0Ycjmj3Ck",
    authDomain: "bash-d04c2.firebaseapp.com",
    databaseURL: "https://bash-d04c2.firebaseio.com",
    projectId: "bash-d04c2",
    storageBucket: "",
    messagingSenderId: "412330479344"
      });
    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      
      // this.platform.registerBackButtonAction(() => {
      //      let view = this.nav.getActive();
      //       if (view.component.name == MainPage) {
      //         //  let toast = this.toastCtrl.create({
      //         //           message:  'Press back again to exit App?',
      //         //           duration: 3000,
      //         //           position: 'bottom'
      //         //       });
      //         //       toast.present();
      //          this.alert = this.alertCtrl.create({
      //   title: 'Exit?',
      //   message: 'Do you want to exit the app?',
      //   buttons: [
      //     {
      //       text: 'Cancel',
      //       role: 'cancel',
      //       handler: () => {
      //         this.alert =null;
      //       }
      //     },
      //     {
      //       text: 'Exit',
      //       handler: () => {
      //         this.platform.exitApp();
      //       }
      //     }
      //   ]
      // });
      // this.alert.present();
      //       }else if(this.nav.canGoBack()){
      //             this.alert = this.alertCtrl.create({
      //   title: 'Exit?',
      //   message: 'Do you want to exit the app?',
      //   buttons: [
      //     {
      //       text: 'Cancel',
      //       role: 'cancel',
      //       handler: () => {
      //         this.alert =null;
      //       }
      //     },
      //     {
      //       text: 'Exit',
      //       handler: () => {
      //         this.platform.exitApp();
      //       }
      //     }
      //   ]
      // });
      // this.alert.present();

      //       }
      // })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // LoadPage(){
  // if(localStorage.getItem("USER_DATA") == null || localStorage.getItem("USER_DATA") == '' || localStorage.getItem("USER_DATA") == undefined)
  //   {
  //        alert("null");
  //        this.navCtrl.push(HomePage);
  //   }else{
  //        this.navCtrl.push(MainPage);
  //   }
  // }
}
