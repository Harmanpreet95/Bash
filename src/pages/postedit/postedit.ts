                      import { Component } from '@angular/core';
                      import { NavController,NavParams } from 'ionic-angular';
                      import { AlertController } from 'ionic-angular';
                      import {Camera,CameraOptions} from '@ionic-native/camera';
                      import { ActionSheetController } from 'ionic-angular';
                      import {Http, Headers, RequestOptions} from '@angular/http';
                      import { Appsetting } from '../../providers/appsetting';
                      import {LoadingController} from 'ionic-angular';
                      import { ToastController } from 'ionic-angular';
                      import { ViewChild } from '@angular/core';
                      import { ModalController } from 'ionic-angular';
                      import { UseraccountPage } from '../useraccount/useraccount';
                      import { Slides } from 'ionic-angular';
                      import {ModalImgPage} from '../modalimg/modalimg';
                      import { Geolocation } from '@ionic-native/geolocation';
                      @Component({
                        selector: 'page-postedit',
                        templateUrl: 'postedit.html'
                      })
                      export class PosteditPage {
                        priceadv: any;
                        latcurr: number;
                        location_curr: any;
                        longcurr: any;
                  
                        fullImg: any;
                        img: any;
                        folderpic: any;
                        packagename: any;
                        loading: any;
                        public Imag = [];
                        images_join: any;
                        imag: any;
                        cat_id= '';
                        pack_name: any;
                        list_package: any;
                        saturation: any;
                        public price = '';
                        brief: any;
                        selling: any;
                        store_id: any;
                        pst_id: any;
                        item: any;
                        public per = '';
                        User_id: string;
                        cat_name: any;
                        lng_add: any;
                        lat_add: any;
                        pack_price = '';
                        pack_id = '';
                        expired='';
                        categories: any;
                        list: any;
                        public images: any;
                        str: string;
                        public cam = [];
                        geocoder: any;
                        lat :any;
                        list_one: any;
                        // public slides :any;
                        gaming: any;
                        data: any;
                        categorylist: any;
                        profile_image: any;
                        srcImage: string;
                        color: number = 0;
                        Price: any;
                        autocompleteItems: any;
                        autocomplete ={ query : '' };
                        acService:any;
                        placesService: any;
                        public Loading=this.loadingCtrl.create({
                                  content: 'Please wait...'
                                  
                                });
                                @ViewChild(Slides) slides: Slides;
                        constructor(public navCtrl: NavController,public modalCtrl: ModalController,public navParams: NavParams,public actionSheetCtrl: ActionSheetController,private camera: Camera ,public alertCtrl: AlertController,private geolocation: Geolocation,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
                          this.geoloc();
                          this.categoryy();
                          this.showProfile();
                        }
                        // slideChanged() {
                        //   alert();
                        //   alert("slide")
                        //   let currentIndex = this.slides.getActiveIndex();
                        //   alert('Current index is'+currentIndex);
                        // }
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
                        
                          ///////////////////////////////////////send address with lat long ////////////////////////////////////
                          chooseItem(items){
                            // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
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
                                            this.latcurr  = data.results[0].geometry.location.lat;
                                            console.log(data.results[0].geometry.location.lng);
                                            this.longcurr =  data.results[0].geometry.location.lng;
                                  })
                              }

                              



                        geoloc(){ 
                          
                            this.Loading.present();
                            console.log("geo");
                            this.User_id = localStorage.getItem("USERID");
                            console.log(this.User_id);
                            // if(this.User_id == null){
                            this.geolocation.getCurrentPosition().then((resp) => {
                            this.latcurr = resp.coords.latitude;
                            this.longcurr = resp.coords.longitude;
                            let headers = new Headers();
                            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                            let options= new RequestOptions({ headers: headers });
                            this.Loading.dismiss();
                          var link_map : string =  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.latcurr+','+this.longcurr+'&sensor=true';         
                              
                               this.http.get(link_map,options).map(res => res.json()).subscribe(dataloc => {
                                  console.log(dataloc.results[3].formatted_address);
                                  this.autocomplete.query = dataloc.results[3].formatted_address;
                          
                               })
                               })
                               
                              }
                              
                      serializeObj(obj){
                          var result = [];
                          for (var property in obj)
                          result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                          return result.join("&");
                      }

                      /////////////Price Range//////////


                      doSomething($event){
                        console.log($event);
                        this.color = 0;
                        this.price = $event;
                        console.log(this.price);
                      }
                      green(){
                        this.color = 1;

                      }

                

                      ////////////////Cam////////////////

                      openActionSheet(){
                        
                      let actionsheet = this.actionSheetCtrl.create({
                      title:"Choose Album",
                      buttons:[{
                      text: 'Camera',
                      handler: () => {
                        const options: CameraOptions = {
                        quality: 20,
                        sourceType : 1,
                        allowEdit : true,
                        correctOrientation: true,
                        destinationType: this.camera.DestinationType.DATA_URL,
                        encodingType: this.camera.EncodingType.JPEG,
                        mediaType: this.camera.MediaType.PICTURE
                      }
                        this.camera.getPicture(options).then((imageData) => {
                        this.srcImage = 'data:image/jpeg;base64,' + imageData;
                        localStorage.setItem("IMG", this.srcImage);
                        this.imag.push(this.srcImage);
                        let Loading=this.loadingCtrl.create({
                                  content: 'Please wait...'
                        });
                        Loading.present();
                        console.log(this.imag.toString());
                        this.profile_image =  imageData; 
                        this.cam.push(this.profile_image);
                        console.log(this.cam.toString());
                        this.str = this.cam.toString();
                        this.images = this.cam.join('harman');
                        let headers = new Headers();
                                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                                    let options= new RequestOptions({ headers: headers });
                                    this.pst_id = this.navParams.get('id');
                                    var gall = {
                                        post_id : this.pst_id,
                                        gallery  :   this.images
                                    }
                                  var serialized_gall = this.serializeObj(gall); 
                                  console.log(serialized_gall);
                                  Loading.present();
                                  var urlpostgallery:string = this.appsetting.myGlobalVar + 'en/account/api_postgallery';
                                  this.http.post(urlpostgallery ,serialized_gall, options).map(res=>res.json()).subscribe(datagall=>{ 
                                  Loading.dismiss();
                                  //    alert(datagall);
                                  // alert(JSON.stringify(datagall));
                                  // alert(datagall.data);
                                  // alert(JSON.stringify(datagall.data));
                               
                                  // for(var z = 0 ; z <= datagall.data.length ; z++){
                                    this.folderpic = datagall.data.join('rahul');
                                    // alert(this.folderpic);
                                     this.categoryy();
                                     this.showProfile();
                                    let alert = this.alertCtrl.create({
                                      title: 'AMAZING!',
                                      message: datagall.msg,
                                      cssClass:'alrt',
                                      buttons: ['OK']
                                    });
                                    alert.present();
                                   
                              })
                      }, (err) => {
                      // Handle error
                      });
                      }
                      },{
                      text: 'Gallery',
                      handler: () => {
                                      const options: CameraOptions = {
                                      quality: 20,
                                      sourceType : 0,
                                      allowEdit : true,
                                      correctOrientation: true,
                                      destinationType: this.camera.DestinationType.DATA_URL,
                                      encodingType: this.camera.EncodingType.JPEG,
                                      mediaType: this.camera.MediaType.PICTURE
                                    }
                                    this.camera.getPicture(options).then((imageUri) => {
                                    this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                                    localStorage.setItem("IMG", this.srcImage);
                                      let Loading=this.loadingCtrl.create({
                                      content: 'Please wait...'
                                  
                                      });
                                      Loading.present();
                        
                                    this.profile_image =  imageUri;
                                    this.cam.push(this.profile_image);
                                    console.log(this.cam.toString());
                                    this.str = this.cam.toString();
                                    this.images = this.cam.join('harman');
                                    let headers = new Headers();
                                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                                    let options= new RequestOptions({ headers: headers });
                                    this.pst_id = this.navParams.get('id');
                                    var gall = {
                                        post_id : this.pst_id,
                                        gallery  :   this.images
                                    }
                              
                                  var serialized_gall = this.serializeObj(gall); 
                                  console.log(serialized_gall);
                                  Loading.present();
                                  var urlpostgallery:string = this.appsetting.myGlobalVar + 'en/account/api_postgallery';
                                  this.http.post(urlpostgallery ,serialized_gall, options).map(res=>res.json()).subscribe(datagall=>{ 
                                  Loading.dismiss();
                                  //  alert(datagall);
                                  // alert(JSON.stringify(datagall));
                                 
                               
                            
                               
                                      this.categoryy();
                                     this.showProfile();
                                    let alert = this.alertCtrl.create({
                                      title: 'AMAZING!',
                                      message: datagall.msg,
                                      cssClass:'alrt',
                                      buttons: ['OK']
                                    });
                                    alert.present();
                                  
                              })
                                    this.Loading.dismiss();
                                    }, (err) => {
                                    // Handle error
                                    });
                      }
                      },
                      {
                              text: 'Cancel',
                              role: 'cancel',
                              handler: () => {
                                console.log('Cancel clicked');
                                //  actionsheet.dismiss()         
                              }
                            }
                          ]
                        });

                        actionsheet.present();
                      }

                      //////////////////////////////////

                      categoryy(){
                          console.log("categories");
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var url:string = this.appsetting.myGlobalVar + 'en/account/api_categorylist';
                          this.http.get(url , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                              this.categorylist = data.categorylist;
                              console.log(this.categorylist);

                          var urlen : string = this.appsetting.myGlobalVar + 'en/account/api_packagelist';
                          this.http.get(urlen , options).map(res=>res.json()).subscribe(dataa=>{
                              console.log(dataa);
                              this.list = dataa.packagelist;
                            
                          })
                          })
                      }
                      /////////////////////////////////////////
                    
                      val(id){
                        let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlcat:string = this.appsetting.myGlobalVar + 'en/account/api_categorylist';
                          this.http.get(urlcat , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                                for(var i=0; i < data.categorylist.length ; i++){
                                            if(data.categorylist[i].title == this.list_one){
                                              console.log(data.categorylist[i].id);
                                              this.cat_id = data.categorylist[i].id;
                                              
                                            }else{
                                              
                                            }
                                }
                          })
                      }

                      package(exp_time,id,price){
                        // this.expired = exp_time;
                        this.pack_id = id;
                        // this.pack_price = price;
                      }
                      pack(){
                    
                      
                        let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlpack:string = this.appsetting.myGlobalVar + 'en/account/api_packagelist';
                          this.http.get(urlpack , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                                for(var i=0; i < data.packagelist.length ; i++){
                                            if(data.packagelist[i].title == this.list_package){
                                              console.log(data.packagelist[i].title);
                                              this.pack_id = data.packagelist[i].id;
                                              console.log(this.pack_id);
                                              this.pack_price = data.packagelist[i].price;
                                              console.log(this.pack_price);
                                              this.expired =  data.packagelist[i].expiration_time;
                                              console.log(this.expired);

                                            }else{
                                              
                                            }
                                }
                          })
                      }
                      ////////////////////////////////////////END/////////////////////////////////////////
                      /////////////////////////////////////////////////////////////////////////////////////


                      showAlert(sell,brief,priceadv) {
                      
                      console.log(priceadv);
                          console.log(this.autocomplete.query);
                            let Loading=this.loadingCtrl.create({
                                  content: 'Please wait...'
                                  
                                });
                          Loading.present();
                            if(sell == '' || brief == '' || priceadv == '' || this.list_one == ''  ||  this.cat_name == '' || this.list_package == '' || priceadv == undefined){
                        Loading.dismiss();    
                    
                          let toast = this.toastCtrl.create({
                            message: 'Please fill out all the details , All fields are mandatory!',
                            duration: 3000,
                            position: 'middle'
                          });
                              toast.present();
                        }
                        
                        else
                        {
                          
                          if(this.packagename == this.list_package){
                            this.pst_id = this.navParams.get('id');
                          
                        
                        let new_headers = new Headers();
                        new_headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        let options_s = new RequestOptions({ headers: new_headers });
                      var link_map : string =  'https://maps.googleapis.com/maps/api/geocode/json?address='+this.autocomplete.query+'&key=AIzaSyA-Bf-YDZaK56ATPH3h8Z4MVa963PFCofs';

                            this.http.get(link_map,options_s).map(res => res.json()).subscribe(data => {
                                        console.log(data);
                                        console.log(data.results[0].geometry.location);
                                        console.log(data.results[0].geometry.location.lat);
                                        this.latcurr  = data.results[0].geometry.location.lat;
                                        console.log(data.results[0].geometry.location.lng);
                                        this.longcurr =  data.results[0].geometry.location.lng;
                        
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlpack:string = this.appsetting.myGlobalVar + 'en/account/api_packagelist';
                          this.http.get(urlpack , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                                for(var i=0; i < data.packagelist.length ; i++){
                                            if(data.packagelist[i].title == this.list_package){
                                              console.log(data.packagelist[i].title);
                                              this.pack_id = data.packagelist[i].id;
                                              console.log(this.pack_id);
                                              this.pack_price = data.packagelist[i].price;
                                              console.log(this.pack_price);
                                              this.expired =  data.packagelist[i].expiration_time;
                                              console.log(this.expired);


                                              
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlcat:string = this.appsetting.myGlobalVar + 'en/account/api_categorylist';
                          this.http.get(urlcat , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                                for(var i=0; i < data.categorylist.length ; i++){
                                            if(data.categorylist[i].title == this.list_one){
                                              console.log(data.categorylist[i].id);
                                              this.cat_id = data.categorylist[i].id;
                                              
                                            }
                                          
                                }
                      
                          this.User_id = localStorage.getItem("USERID");
                          console.log(this.User_id);
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlpost:string = this.appsetting.myGlobalVar + 'en/account/api_editsinglepost';
                          var post_adv = {

                            itemname : sell,
                            item_desc :brief,
                            price : priceadv,
                            cat : this.cat_id,
                            location : this.autocomplete.query,
                            id : this.pst_id,
                            created_by :  this.User_id,
                            latitude :  this.latcurr ,
                            longitude :  this.longcurr ,
                            package_expiration : this.expired,
                            package_id : this.pack_id,
                            package_price : this.pack_price,
                            package_status : 0
                           

                          }

                    
                          var serialized_objj = this.serializeObj(post_adv); 
                          console.log(serialized_objj);
                          this.http.post(urlpost ,serialized_objj, options).map(res=>res.json()).subscribe(data=>{
                          Loading.dismiss();
                          let alert = this.alertCtrl.create({
                            title: 'AMAZING!',
                            message: data.msg,
                            cssClass:'alrt',
                            buttons: ['OK']
                          });
                          alert.present();
                          this.navCtrl.push(UseraccountPage);
                          })
                          })
                                            }
                                }
                          })
                                })
                        }else{
                           this.pst_id = this.navParams.get('id');
                          
                        
                        let new_headers = new Headers();
                        new_headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        let options_s = new RequestOptions({ headers: new_headers });
                      var link_map : string =  'https://maps.googleapis.com/maps/api/geocode/json?address='+this.autocomplete.query+'&key=AIzaSyA-Bf-YDZaK56ATPH3h8Z4MVa963PFCofs';

                            this.http.get(link_map,options_s).map(res => res.json()).subscribe(data => {
                                        console.log(data);
                                        console.log(data.results[0].geometry.location);
                                        console.log(data.results[0].geometry.location.lat);
                                        this.latcurr  = data.results[0].geometry.location.lat;
                                        console.log(data.results[0].geometry.location.lng);
                                        this.longcurr =  data.results[0].geometry.location.lng;
                        
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlpack:string = this.appsetting.myGlobalVar + 'en/account/api_packagelist';
                          this.http.get(urlpack , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                                for(var i=0; i < data.packagelist.length ; i++){
                                            if(data.packagelist[i].title == this.list_package){
                                              console.log(data.packagelist[i].title);
                                              this.pack_id = data.packagelist[i].id;
                                              console.log(this.pack_id);
                                              this.pack_price = data.packagelist[i].price;
                                              console.log(this.pack_price);
                                              this.expired =  data.packagelist[i].expiration_time;
                                              console.log(this.expired);


                                              
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlcat:string = this.appsetting.myGlobalVar + 'en/account/api_categorylist';
                          this.http.get(urlcat , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                                for(var i=0; i < data.categorylist.length ; i++){
                                            if(data.categorylist[i].title == this.list_one){
                                              console.log(data.categorylist[i].id);
                                              this.cat_id = data.categorylist[i].id;
                                              
                                            }
                                          
                                }
                      
                          this.User_id = localStorage.getItem("USERID");
                          console.log(this.User_id);
                          let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlpost:string = this.appsetting.myGlobalVar + 'en/account/api_editsinglepost';
                          var post_adv = {

                            itemname : sell,
                            item_desc :brief,
                            price : this.price,
                            cat : this.cat_id,
                            location : this.autocomplete.query,
                            id : this.pst_id,
                            created_by :  this.User_id,
                            latitude :  this.latcurr ,
                            longitude :  this.longcurr ,
                            package_expiration : this.expired,
                            package_id : this.pack_id,
                            package_price : this.pack_price,
                            package_status : 1
                           

                          }

                    
                          var serialized_objj = this.serializeObj(post_adv); 
                          console.log(serialized_objj);
                          this.http.post(urlpost ,serialized_objj, options).map(res=>res.json()).subscribe(data=>{
                          Loading.dismiss();
                          let alert = this.alertCtrl.create({
                            title: 'AMAZING!',
                            message: data.msg,
                            cssClass:'alrt',
                            buttons: ['OK']
                          });
                          alert.present();
                          this.navCtrl.push(UseraccountPage);
                          })
                          })
                                            }
                                }
                          })
                                })
                        }
                        }           
                                        
                                }
                  
                  showProfile(){ 
                    
                      this.Loading.present();
                      let imag : any;
                      this.pst_id = this.navParams.get('id');
                      this.User_id = localStorage.getItem("USERID");
                      console.log("show")
                      this.store_id = this.navParams.get('postid');
                      let headers = new Headers();
                      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                      let options= new RequestOptions({ headers: headers });
                      var url_post  : string = this.appsetting.myGlobalVar + 'en/account/api_singlepostpage';
                      var post_id = {
                            id :  this.pst_id
                      }
                    var serial = this.serializeObj(post_id); 
                    console.log(serial);
                    
                      this.http.post(url_post ,serial,options).map(res=>res.json()).subscribe(data=>{
                      this.Loading.dismiss();
                      console.log(data);
                      if(data.error == 0){
                   
                        this.selling = data.searchresult.title;
                        this.brief = data.searchresult.description;
                        this.priceadv =  data.searchresult.price;
                        this.autocomplete.query = data.searchresult.address;
                        this.saturation = data.searchresult.price;
                        this.list_one =  data.searchresult.cattitle;
                        this.list_package = data.searchresult.packagetitle;
                        this.imag = data.searchresult.gallery;   
                        this.packagename = data.searchresult.packagetitle; 
                          }
                      })
                  }
                  imagedel(imid){
                
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    let options= new RequestOptions({ headers: headers });
                    var url_imag : string = this.appsetting.myGlobalVar + 'en/account/api_deletepostgallery';
                    var imageid = {
                            id : imid
                    }
                    var serial_image = this.serializeObj(imageid); 
                    console.log(serial_image);
                    
                    this.http.post(url_imag ,serial_image,options).map(res=>res.json()).subscribe(datadel=>{
                      this.Loading.dismiss();
                      console.log(datadel);
                      if(datadel.error == 0){
                      
                          let alert = this.alertCtrl.create({
                            title: 'AMAZING!',
                            message: datadel.msg,
                            cssClass:'alrt',
                            buttons: ['OK']
                          });
                          alert.present();
                            
                          this.categoryy();
                          this.showProfile();
                      }
                    })
                  }









 fullview(imgg) {
            this.fullImg = localStorage.setItem('fullImage',imgg);
            let modal = this.modalCtrl.create(ModalImgPage);
            modal.present();
          }
        }
