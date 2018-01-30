import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { HomePage } from '../home/home';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import {googlemaps} from 'googlemaps';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  listcountry: any;
  address_loc: any;
  longi: number;
  lati: number;



    // email: any;
  submitted = false;
  onSubmit() { this.submitted = true; }
public data : any ='';
public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,public geolocation: Geolocation,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
                  this.geoloc();
                  this.countrylist();
  }


serializeObj(obj){
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
}


countrylist(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  let options= new RequestOptions({ headers: headers });
  var url:string = this.appsetting.myGlobalVar + 'en/account/api_countrylists';
     this.http.get(url, options).map(res=>res.json()).subscribe(data=>{
          console.log(data);
          this.listcountry = data.countries;
     })
}

geoloc(){
            this.geolocation.getCurrentPosition().then((resp) => {
            console.log("resp1" +resp.coords.latitude);
            console.log("resp2" + resp.coords.longitude);
            this.lati = resp.coords.latitude;
            this.longi = resp.coords.longitude;

             let headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
              let options = new RequestOptions({ headers: headers });
                var link_map1 : string =  'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lati+','+ this.longi+'&key=AIzaSyA-Bf-YDZaK56ATPH3h8Z4MVa963PFCofs';

                      this.http.get(link_map1,options).map(res => res.json()).subscribe(data => {
                                  console.log(data);
                                  console.log(data.results[0].formatted_address);
                                  this.address_loc = data.results[0].formatted_address;
                                    // var loc = ({
                                    //     lat : resp.coords.latitude,
                                    //     long : resp.coords.longitude,
                                    //     address : data.results[0].formatted_address
                                    //   })
                                      // console.log(loc);
                                      // this.data = loc;


                      })

   

          })
}
          
// runTimeChange(email) {
//   console.log(email);
//   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }
emailfn(datae){
  console.log(datae);

}
public register(signup){
    console.log(signup);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let options= new RequestOptions({ headers: headers });
    var url:string = this.appsetting.myGlobalVar + 'en/account/api_register';

  var data1 = ({
            first_name:signup.value.fname,
            last_name:signup.value.lname,
            useremail:signup.value.email,
            username:signup.value.uname,
            password:signup.value.password,
            cpassword: signup.value.cpassword,
            country:signup.value.country,
            phone : signup.value.phone,
            address : this.address_loc,
            latitude :this.lati,
            longitude : this.longi
     
          });
          
    console.log(data1);
    var serialized = this.serializeObj(data1);
    console.log(serialized);
    if(signup.value.password == signup.value.cpassword)
    {
       this.Loading.present();
       this.http.post(url, serialized, options).map(res=>res.json()).subscribe(data=>{
       this.Loading.dismiss();
       this.data=data;
       console.log(this.data);
       if(data.error == 0)
      {
        let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 3000
          });
            toast.present();
            signup.reset();
            this.navCtrl.push(HomePage);
        }else{
          let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000
          });
          toast.present();
        }
      }, err=>{
        this.Loading.dismiss();
        alert("Server not Working,Please Check your Internet Connection and try again!");
        console.log("Error!:", err.json());
      });
  }
  else {
  let toast = this.toastCtrl.create({
      message: 'Password Mismatch',
      duration: 3000
    });
    toast.present();
    }
}
 signin(){
    this.navCtrl.push(HomePage);
  }

}
