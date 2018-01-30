import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForgotpwPage } from './forgotpw';

@NgModule({
  declarations: [
    ForgotpwPage,
  ],
  imports: [
    IonicModule.forRoot(ForgotpwPage),
  ],
  exports: [
    ForgotpwPage
  ]
})
export class ForgotpwPageModule {}
