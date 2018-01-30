import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModaldPage } from '../modald/modald';



@Component({
  selector: 'page-modalc',
  templateUrl: 'modalc.html'
})
export class ModalcPage {

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public modalCtrl: ModalController) {

  }

 dismiss() {
    this.viewCtrl.dismiss();
  }

presentModal() {
    let modal = this.modalCtrl.create(ModaldPage);
    modal.present();
  }

}
