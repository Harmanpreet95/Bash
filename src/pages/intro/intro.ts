import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';


/**
 * Generated class for the Intro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class Intro{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
 

console.log('LOCALSTORAGE ',localStorage.getItem("USERID"));
if(localStorage.getItem("USERID") != null){
 this.navCtrl.push(MainPage);
   
}else{
  
  this.navCtrl.push(HomePage);
}
   
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Intro');
  // }

nextPage(){

   
  
  }
skip(){
  //  if(localStorage.getItem("USER_DATA") != null || localStorage.getItem("USER_DATA") != '' || localStorage.getItem("USER_DATA") != undefined)
  //   {
        
  //          this.navCtrl.push(MainPage);
  //   }else{
     
        this.navCtrl.push(HomePage);
    // }

}
}
