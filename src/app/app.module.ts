import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ForgotpwPage } from '../pages/forgotpw/forgotpw';
import { ListPage } from '../pages/list/list';
import { Intro } from '../pages/intro/intro';
import { SignupPage } from '../pages/signup/signup';
import { MainPage } from '../pages/main/main';
import {ModalCatPage} from '../pages/modalcat/modalcat';
import { PostPage } from '../pages/post/post';
import { ModalPage } from '../pages/modal/modal';
import { ModalbPage } from '../pages/modalb/modalb';
import { AdvertisePage } from '../pages/advertise/advertise';
import { ChatPage } from '../pages/chat/chat';
import { ChatUsersPage } from '../pages/chatUsers/chatUsers';
import { MapPage } from '../pages/map/map';
import { ProfilePage } from '../pages/profile/profile';
import { EditPage } from '../pages/edit/edit';
import { UseraccountPage } from '../pages/useraccount/useraccount';
import { NotificationPage } from '../pages/notification/notification';
import { ItemofferPage } from '../pages/itemoffer/itemoffer';
import { ModalcPage } from '../pages/modalc/modalc';
import { ModaldPage } from '../pages/modald/modald';
import { Appsetting } from '../providers/appsetting';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PosteditPage } from '../pages/postedit/postedit';
import firebase from 'firebase/app';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import 'firebase/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
// import { Ng2MapModule} from 'ng2-map'
import {ModalImgPage} from '../pages/modalimg/modalimg';
import { Geolocation } from '@ionic-native/geolocation';
import {filterPage} from '../pages/filter/filter';
import {paidPostPage} from '../pages/paidPost/paidPost';
import {PaymentPage} from '../pages/payment/payment';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { MainSearchPage } from '../pages/mainSearch/mainSearch';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
// import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
export const firebaseConfig = {
  apiKey: "AIzaSyDPXU1IQb-XUp1lbxE_WvBKgj0Ycjmj3Ck",
  authDomain: "bash-d04c2.firebaseapp.com",
  databaseURL: "https://bash-d04c2.firebaseio.com",
  projectId: "bash-d04c2",
  storageBucket: "",
  messagingSenderId: "412330479344"

};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PaymentPage,
    MainSearchPage,
    ListPage,
    Intro,
    ChatUsersPage,
    filterPage,
    ModalCatPage,
    ChatlistPage,
    SignupPage,
    MainPage,
    PostPage,
    paidPostPage,
    ModalPage,
    ModalImgPage,
    AdvertisePage,
    PosteditPage,
    ChatPage,
    ModalbPage,
    MapPage,
    ProfilePage,
    EditPage,
    UseraccountPage,
    NotificationPage,
    ItemofferPage,
    ModalcPage,
    ModaldPage,
    ForgotpwPage
    
  ],
  imports: [
    // GooglePlaceModule,
 
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),

    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ForgotpwPage,
    MainSearchPage,
    HomePage,
    ListPage,
    filterPage,
    Intro,
    SignupPage,
    PaymentPage,
    paidPostPage,
    ChatUsersPage,
    ChatlistPage,
    ModalCatPage,
    ModalImgPage,
    PosteditPage,
    MainPage,
    PostPage,
    ModalPage,
    AdvertisePage,
    ChatPage,
    ModalbPage,
    MapPage,
    ProfilePage,
    EditPage,
    UseraccountPage,
    NotificationPage,
    ItemofferPage,
    ModalcPage,
    ModaldPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    AngularFireAuth,
    Appsetting,
    Camera,
    Geolocation,
    GoogleMaps,
    PayPal,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
