                      import { Component } from '@angular/core';
                      import { NavController } from 'ionic-angular';
                      import { AlertController } from 'ionic-angular';
                      import {Camera,CameraOptions} from '@ionic-native/camera';
                      import { ActionSheetController } from 'ionic-angular';
                      import {Http, Headers, RequestOptions} from '@angular/http';
                      import { Appsetting } from '../../providers/appsetting';
                      import {LoadingController} from 'ionic-angular';
                      import { ToastController } from 'ionic-angular';
                      import { MainPage } from '../main/main';
                      import { ModalController } from 'ionic-angular';
                      import {ModalImgPage} from '../modalimg/modalimg';
                      import { ModaldPage } from '../modald/modald';
                      import {googlemaps} from 'googlemaps';
                      import { Geolocation } from '@ionic-native/geolocation';
                      @Component({
                        selector: 'page-paidPost',
                        templateUrl: 'paidPost.html'
                      })
                      export class paidPostPage {
                        post_advertise: any;
                        location_curr: any;
                        longcurr: number;
                        latcurr: number;
                        btnprice: any;
                        fullImg: void;
                        button2: any;
                        button1: any;
                        folderpic: any;
                        imgcheck: number;
                        list_package: any;
                        img: string;
                        public picImag = [] ;
                        public pic: any;
                        public picsfolder = [] ;
                        item: any;
                        public per = '';
                        User_id: string;
                        cat_name: any;
                        lng_add: any;
                        lat_add: any;
                        pack_price: any;
                        pack_id: any;
                        expired: any;
                        categories: any;
                        list: any;
                        images: string;
                        str: string;
                        public cam = [];
                        geocoder: any;
                        lat :any;
                        list_one: any;
                        public slides :any;
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
                        constructor(public navCtrl: NavController,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController,private camera: Camera ,public alertCtrl: AlertController,private geolocation: Geolocation,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
                          this.categoryy();
                          this.geoloc();
                          console.log(this.picImag.length);
                        
                          // console.log(this.imgcheck);

                        }
                        remove(){
                          
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
                        this.Price = $event;
                        console.log(this.Price);
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
                        this.picImag.push(this.srcImage);
                        console.log(this.picImag.length);
                        let Loading=this.loadingCtrl.create({
                                  content: 'Please wait...'
                                  
                                });
                        Loading.present();
                        console.log(this.picImag.toString());
                      
                        this.img = this.picImag.toString();
                  
                                
                        this.profile_image =  imageData; 
                        this.cam.push(this.profile_image);
                        console.log(this.cam.toString());
                      
                        this.str = this.cam.toString();
                    
                        this.images = this.cam.join('harman');
                        // Loading.dismiss();
                        // let alert = this.alertCtrl.create({
                        //     title: 'AMAZING!',
                        //     message: 'Image Uploaded Successfully',
                        //     cssClass:'alrt',
                        //     buttons: ['OK']
                        //   });
                        //   alert.present();
                          let headers = new Headers();
                                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                                    let options= new RequestOptions({ headers: headers });
                                    // this.pst_id = this.navParams.get('id');
                                    var gall = {
                                        // post_id : this.pst_id,
                                        gallery  :   this.images
                                    }
                                    // alert(gall);
                                    // alert(JSON.stringify(gall));
                                  var serialized_gall = this.serializeObj(gall); 
                                  console.log(serialized_gall);
                                
                                  Loading.present();
                                  var urlpostgallery:string = this.appsetting.myGlobalVar + 'en/account/api_saveimgfolder';
                                  this.http.post(urlpostgallery ,serialized_gall, options).map(res=>res.json()).subscribe(datagall=>{ 
                                  Loading.dismiss();
                              
                                    this.folderpic = datagall.data.join('rahul');
                                   
                               
                                    let alert = this.alertCtrl.create({
                                      title: 'AMAZING!',
                                      message: datagall.msg,
                                      cssClass:'alrt',
                                      buttons: ['OK']
                                    });
                                    alert.present();
                                   
                              })
                      }, (err) => {
                        let Loading=this.loadingCtrl.create({
                                  content: 'Please wait...'
                                  
                        });
                        Loading.dismiss();
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
                                     let Loading=this.loadingCtrl.create({
                                              content: 'Please wait...'
                                              
                                            });
                                    Loading.present();
                                    localStorage.setItem("IMG", this.srcImage);
                                    this.picImag.push(this.srcImage);
                                    console.log(this.picImag.length);
                                    console.log(this.picImag.toString());
                                
                                    this.img = this.picImag.toString();
                              
                                
                                    this.profile_image =  imageUri;
                                    this.cam.push(this.profile_image);
                                  
                                    console.log(this.cam.toString());
                                    this.str = this.cam.toString();
                                
                                    this.images = this.cam.join('harman');
                                     let headers = new Headers();
                                    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                                    let options= new RequestOptions({ headers: headers });
                                    // this.pst_id = this.navParams.get('id');
                                    var gall = {
                                        // post_id : this.pst_id,
                                        gallery  :   this.images
                                    }
                              
                                  var serialized_gall = this.serializeObj(gall); 
                                  console.log(serialized_gall);
                                  Loading.present();
                                  var urlpostgallery:string = this.appsetting.myGlobalVar + 'en/account/api_saveimgfolder';
                                  this.http.post(urlpostgallery ,serialized_gall, options).map(res=>res.json()).subscribe(datagall=>{ 
                                  Loading.dismiss();
                                
                                    this.folderpic = datagall.data.join('rahul');
                                    let alert = this.alertCtrl.create({
                                      title: 'AMAZING!',
                                      message: datagall.msg,
                                      cssClass:'alrt',
                                      buttons: ['OK']
                                    });
                                    alert.present();
                                    // Loading.dismiss();
                                  })
                                   
                                  }, (err) => {
                                    let Loading=this.loadingCtrl.create({
                                              content: 'Please wait...'
                                              
                                    });
                                    Loading.dismiss();
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
                        this.Loading.present();
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
                               this.Loading.dismiss();
                               console.log(dataa.packagelist[0].title);
                              console.log(dataa.packagelist[1].title);
                              this.button1 = dataa.packagelist[0].title;
                              this.btnprice = dataa.packagelist[0].price;
                              this.button2 = dataa.packagelist[1].title;
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
                                            if(data.categorylist[i].id == this.list_one){
                                              console.log(data.categorylist[i].title);
                                              this.cat_name = data.categorylist[i].title;
                                              
                                            }else{
                                              
                                            }
                                }
                          })
                      }

                      package(exp_time,id,price){
                        this.expired = exp_time;
                        this.pack_id = id;
                        this.pack_price = price;
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
                    let Loading=this.loadingCtrl.create({
                                  content: 'Please wait...'
                                  
                                });
                      Loading.present();
                        if(sell == '' || brief == '' || priceadv == '' || this.list_one == ''   || this.cat_name == ''|| priceadv == undefined){
                        Loading.dismiss();    
                    
                          let toast = this.toastCtrl.create({
                            message: 'Please fill out all the details , All fields are mandatory!',
                            duration: 3000,
                            position: 'middle'
                          });
                              toast.present();
                        }else if(this.folderpic == '' || this.folderpic == undefined || this.images == undefined){
                          Loading.dismiss(); 
                          let toast = this.toastCtrl.create({
                            message: 'Please Select an image to post advertisement!',
                            duration: 3000,
                            position: 'middle'
                          });
                              toast.present();
                        }
                        
                        else
                        {
 
           
            let headers = new Headers();
                          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                          let options= new RequestOptions({ headers: headers });
                          var urlpack:string = this.appsetting.myGlobalVar + 'en/account/api_packagelist';
                          this.http.get(urlpack , options).map(res=>res.json()).subscribe(data=>{
                              console.log(data);
                             
                                for(var i=0; i < data.packagelist.length ; i++){
                                            if(data.packagelist[i].title == this.button1){
                                              console.log(data.packagelist[i].title);
                                              this.pack_id = data.packagelist[i].id;
                                              console.log(this.pack_id);
                                              this.pack_price = data.packagelist[i].price;
                                              console.log(this.pack_price);
                                              this.expired =  data.packagelist[i].expiration_time;
                                              console.log(this.expired);
    //                                           // let toast = this.toastCtrl.create({
    //                                           //   message: 'Post Package Selected',
    //                                           //   duration: 3000,
    //                                           //   position: 'middle'
    //                                           // });
    //                                           //  toast.present();
    //                     Loading.present();
                        console.log(sell);
                        console.log(brief);
                            this.User_id = localStorage.getItem("USERID");
                          console.log(this.User_id);
    //                       let headers = new Headers();
    //                       headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //                       let options= new RequestOptions({ headers: headers });
    //                       var urlpost:string = this.appsetting.myGlobalVar + 'en/account/api_addpost';
                          
                          this.post_advertise = {

                            itemname : sell,
                            item_desc :brief,
                            price : priceadv,
                            cat : this.list_one,
                            location : this.autocomplete.query,
                            created_by :  this.User_id,
                            latitude :  this.latcurr ,
                            longitude :  this.longcurr ,
                            package_expiration : this.expired,
                            package_id : this.pack_id,
                            package_price : this.pack_price,
                            images :  this.folderpic

                          }
                          console.log(this.post_advertise);
                          localStorage.setItem('Paid_adv',JSON.stringify(this.post_advertise));
                          this.navCtrl.push(ModaldPage,{Price : this.btnprice});
    //                     var serialized_objj = this.serializeObj(post_adv); 
    //                     console.log(serialized_objj);
    //                     this.http.post(urlpost ,serialized_objj, options).map(res=>res.json()).subscribe(data=>{
                        Loading.dismiss();

    //                           if(data.error == 0){
    //                            this.navCtrl.push(MainPage);
    //                           let alert = this.alertCtrl.create({
    //                           title: 'AMAZING!',
    //                           message: 'Advertisement Posted Successfully',
    //                           cssClass:'alrt',
    //                           buttons: ['OK']
    //                         });
    //                         alert.present();
                           
                            
    //                           }
    //                     })
    //                                         }else{
                                              
    //                                         }
    //                             }
    //                       })
                        }
                      }
                        })
  
                        }
                        }
                      // }
                   
 fullview(imgg) {
            this.fullImg = localStorage.setItem('fullImage',imgg);
            let modal = this.modalCtrl.create(ModalImgPage);
            modal.present();
          }
                      }
