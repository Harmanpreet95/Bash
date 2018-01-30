import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal',
  templateUrl: 'modalimg.html'
})
export class ModalImgPage {
  fullImg: any;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {
    this.fullImg = localStorage.getItem('fullImage');
  }

 dismiss() {
    this.viewCtrl.dismiss();
  }

}
