        import { Component } from '@angular/core';
        import { NavController, MenuController } from 'ionic-angular';
        import { SplashScreen } from '@ionic-native/splash-screen';
        import { PostPage } from '../post/post';
        import {Http, Headers, RequestOptions} from '@angular/http';
        import { ModalController } from 'ionic-angular';
        import { ModalPage } from '../modal/modal';
        import { AdvertisePage } from '../advertise/advertise';
        import { ProfilePage } from '../profile/profile';
        import { UseraccountPage } from '../useraccount/useraccount';
        import { Geolocation } from '@ionic-native/geolocation';
        import { LoadingController, AlertController } from 'ionic-angular';
        import { Appsetting } from '../../providers/appsetting';
        import { ToastController } from 'ionic-angular';
        import {paidPostPage} from '../paidPost/paidPost';
        // import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
        import {googlemaps} from 'googlemaps';
        import { MainSearchPage } from '../mainSearch/mainSearch';
        @Component({
          selector: 'page-main',
          templateUrl: 'main.html'
        })
        export class MainPage {
          paiddeal: any;
          public search_bit = 0;
          geolocationPosition: Position;
          UID: string;
          freebotm: any;
          paidtop: any;
          searchres: any;
          item: any;
          lng_add: any;
          lat_add: any;
          long: number;
          lat: number;
          autocompleteItems: any;
          autocomplete ={ query : '' };
          acService:any;
          placesService: any;
          data: any;
          nn: any;
          public resp: any;
            public name= '';
            public errorValue = '';
            public searchList = '';
            public Loading=this.loadingCtrl.create({
              content: 'Please wait...'
              
            });
          public options = {types: ['address'],componentRestrictions: { country: 'FR' }}
            ionViewDidLoad() {
              this.geoloc();
            }
          constructor(public navCtrl: NavController,public splashScreen: SplashScreen,private menu: MenuController,public toastCtrl: ToastController,public http:Http,public appsetting: Appsetting,public alertCtrl: AlertController,public loadingCtrl:LoadingController,public modalCtrl: ModalController,public geolocation: Geolocation) {
              this.geoloc(); 
           
              this.menu.swipeEnable(false);
              this.splashScreen.hide();
                 this.UID = localStorage.getItem("USERID");
                 console.log(this.UID);
          }
main(){
  this.search_bit= 0;
}
        serializeObj(obj){
            var result = [];
            for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
            return result.join("&");
        }
        paidpost(){
          this.navCtrl.push(paidPostPage);
        }
        prfPage(){
        
          if(this.UID == null){
                  let toast = this.toastCtrl.create({
                                  message: 'Please Login first to go to your account page!',
                                  duration: 3000,
                                  position : 'middle'
                   });
                  toast.present();
              }else{
            this.navCtrl.push(UseraccountPage);
              }
          }

        pstPage(){
  // alert("dfj")
              if(this.UID == null){
                  let toast = this.toastCtrl.create({
                                  message: 'Please Login first to post an advertisement!',
                                  duration: 3000,
                                  position : 'middle'
                   });
                  toast.present();
              }else{
                this.navCtrl.push(PostPage);
              }
          }

        pstdPage(deal_id){
      
                  this.navCtrl.push(AdvertisePage,{postid:deal_id})

          }
          searchpage(){
            this.search_bit = 1;
            // this.navCtrl.push(MainSearchPage);
          }
        presentModal() {
            let modal = this.modalCtrl.create(ModalPage);
            modal.present();
          }
        ionViewDidEnter() {
            this.menu.swipeEnable(false, 'menu1');
          }
        geoloc(){
          // let Loading=this.loadingCtrl.create({
          //   content: 'Please wait...'
          // });
            this.Loading.present();
            this.geolocation.getCurrentPosition().then((resp) => {
            console.log("resp1" +resp.coords.latitude);
            this.lat = resp.coords.latitude;
            console.log("resp2" + resp.coords.longitude);
            this.long = resp.coords.longitude;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options= new RequestOptions({ headers: headers });
            var url  : string = this.appsetting.myGlobalVar + 'en/account/api_postsearchlist';
            var land_page = {
                    lat  : this.lat,
                    long :  this.long
            }
          var serialized_obj = this.serializeObj(land_page); 
          console.log(serialized_obj);
          this.http.post(url ,serialized_obj, options).map(res=>res.json()).subscribe(data=>{
                console.log(data);
                this.Loading.dismiss();
                if(data.error == 0){
                  console.log("error");
              
                     this.Loading.dismiss();
                      this.errorValue = '2';
                      // for(var j=0;j<=data.searchresult.free.length;j++){
                        // data.searchresult.free[j].gallery = data.searchresult.free[j].gallery.split('rahul')[0];
                        // console.log(data.searchresult.free[j].gallery);
                        //  data.searchresult.paid[j].gallery = data.searchresult.paid[j].gallery.split('rahul')[0];
                          // console.log(data.searchresult.paid[j].gallery);
                          this.paidtop = data.searchresult.paid;
                        this.freebotm = data.searchresult.free;

                         
                      // }
               
                }else{
              
                  this.Loading.dismiss();
                }
          },err=>{
            let alert = this.alertCtrl.create({
              title: 'OOPS!',
              message:"Network error!",
              cssClass:'alrt',
              buttons: ['OK']
            });
            alert.present();
            this.Loading.dismiss();
          })
        
        }).catch((error) => {
          let alert = this.alertCtrl.create({
            title: 'OOPS!',
            message:"Please Turn On Your Location!",
            cssClass:'alrt',
            buttons: ['OK']
          });
          alert.present();
          this.Loading.dismiss();
          console.log('Error getting location', error);
        });

        }

        setFilteredItems(){
          console.log('Working');

            if(this.name.length == 0) {
          // this.ListScheduledPatients();
            console.log('plz write something');
            
            this.errorValue = '2'; 
            console.log(this.errorValue);
          } else {

          this.searchList = this.filterItems(this.name);
          this.paiddeal = this.filterItems1(this.name);
          console.log('Filtering');
          this.errorValue = '0';
          console.log(this.errorValue);
          }
        }
          
          
        public filterItems(searchTerm){
                console.log(searchTerm);
                return this.freebotm.filter((freelist) => {
                    return freelist.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                });     
        
            }
            public filterItems1(searchTerm){
              console.log(searchTerm);
              return this.paidtop.filter((paidlist) => {
                  return paidlist.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
              });     
      
          }
        ngOnInit() {
        this.acService = new google.maps.places.AutocompleteService(); 
        this.autocompleteItems = [];
        this.autocomplete = {
        query: ''
        };        
        }

        updateSearch() {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
        this.autocompleteItems = [];
        return;
        }
        let self = this; 
        let config = {
        input: this.autocomplete.query, 
        componentRestrictions: {  } 
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
              console.log('modal > getPlacePredictions > status > ', status);
              self.autocompleteItems = [];            
              predictions.forEach(function (prediction) {              
              self.autocompleteItems.push(prediction);
              });
              });
        }
        chooseItem(items){
          console.log(items);
          this.autocomplete.query = items;
          this.autocompleteItems = [];
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({ headers: headers });
            var link_map : string =  'https://maps.googleapis.com/maps/api/geocode/json?address='+this.autocomplete.query+'&key=AIzaSyA-Bf-YDZaK56ATPH3h8Z4MVa963PFCofs';

              this.http.get(link_map,options).map(res => res.json()).subscribe(data => {
                          console.log(data);
                          console.log(data.results[0].geometry.location);
                          console.log(data.results[0].geometry.location.lat);
                          this.lat_add  = data.results[0].geometry.location.lat;
                          console.log(data.results[0].geometry.location.lng);
                          this.lng_add =  data.results[0].geometry.location.lng;

              var urlen : string = this.appsetting.myGlobalVar + 'en/account/api_postsearchlist';
              var search_page = {
                        

                    lat  : this.lat_add,
                    long : this.lng_add

            }
              var serialized = this.serializeObj(search_page); 
              console.log(serialized);
              this.http.post(urlen ,serialized, options).map(res=>res.json()).subscribe(dataloc=>{
                console.log(data);
                if(dataloc.error == 0){
                this.errorValue = '2';
              this.autocomplete.query = '';
            
              this.freebotm = dataloc.searchresult.free;
                }else{
                      this.errorValue = '3';
                                  let toast = this.toastCtrl.create({
                                  message: dataloc.msg,
                                  duration: 3000,
                                  position : 'middle'
                   });
                  toast.present();
              
                }
                })
              })
        }

        detail(){
          this.navCtrl.push(ProfilePage);
        }




        }
