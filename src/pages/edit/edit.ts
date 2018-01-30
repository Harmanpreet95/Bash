import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';


@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {

  constructor(public navCtrl: NavController) {

  }

mpPage(){
    this.navCtrl.push(MapPage);
  }

}
