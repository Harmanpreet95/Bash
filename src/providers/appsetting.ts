import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Appsetting provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Appsetting {
 myGlobalVar: string ='http://rakesh.crystalbiltech.com/ads/';
  constructor(public http: Http) {
    console.log('Hello Appsetting Provider');
  }

}
