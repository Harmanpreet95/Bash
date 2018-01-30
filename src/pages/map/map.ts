import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  mapElement: any;
  map: any;

  constructor(public navCtrl: NavController,private launchNavigator: LaunchNavigator,public alertCtrl: AlertController,private googleMaps: GoogleMaps) {
this.load();
  }

 showAlert() {
    let alert = this.alertCtrl.create({
      title: 'AMAZING!',
      message: 'Advertisement Posted Successfully',
      cssClass:'alrt',
      buttons: ['OK']
    });
    alert.present();
  }
// ionViewDidLoad(){
//     this.loadMap();
//   }
 
// loadMap() {
//   var myLatLng = {lat: 30.6942, lng: 76.8606};

//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//           center: myLatLng
//         });

//         var marker = new google.maps.Marker({
//           position: myLatLng,
//           map: map,
//           title: 'Hello World!'
//         });
//  }
load(){
let options: LaunchNavigatorOptions = {
  start: 'London, ON',
  // app: LaunchNavigator.APPS.UBER
};

this.launchNavigator.navigate('Toronto, ON', options)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );
}
}
