                import { Component } from '@angular/core';
                import { NavController } from 'ionic-angular';
                import { NotificationPage } from '../notification/notification';
                import { ItemofferPage } from '../itemoffer/itemoffer';
                import {Http, Headers, RequestOptions} from '@angular/http';
                import { Appsetting } from '../../providers/appsetting';
                import {LoadingController} from 'ionic-angular';
                import { ToastController } from 'ionic-angular';
                import { AlertController } from 'ionic-angular';
                import {Camera,CameraOptions} from '@ionic-native/camera';
                import { ActionSheetController } from 'ionic-angular';
                import { HomePage } from '../home/home';
                import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
                import firebase from 'firebase';
                import { Platform } from 'ionic-angular';
                import { AngularFireModule } from 'angularfire2';
                import { AngularFireAuth } from 'angularfire2/auth';
                import { PosteditPage } from '../postedit/postedit';
                import { MainPage } from '../main/main';
                import { AdvertisePage } from '../advertise/advertise';
                 import { ChatPage } from '../chat/chat';
                  import {googlemaps} from 'googlemaps';
                 import { ChatlistPage } from '../chatlist/chatlist';
                @Component({
                  selector: 'page-useraccount',
                  templateUrl: 'useraccount.html'
                })
                export class UseraccountPage {
                  checkactive: any;
                  favolist: any;
                  gallery_1stImage: any;
                  public itemsClose : any = 0;
                  listItems: any;
                  myitems: any;
                  lng_add: any;
                  lat_add: any;
                  address: any;
                  facebookConnectPlugin: any;
                  user: any;
                  user_name: any;
                  fb_id: any;
                  UID: string;
                  autocompleteItems: any;
                  autocomplete ={ query : '' };
                  acService:any;
                  placesService: any;
                    public bit : any = 1;
                    public bitclose : any = 0;
                    public data='';
                    public User_id;
                    data_Profile :  any;
                    public base64Image: string;
                    srcImage : string;
                    submitted = false;
                    onSubmit() { this.submitted = true; }
                    public Loading=this.loadingCtrl.create({
                        content: 'Please wait...'
                        
                      });
                        public CameraPopoverOptions ;
                  public profile_image = '';
                  //  diseases = [
                  //   { title: "Edit Profile", description: "Type 1 diabetes is an autoimmune disease in which the body’s immune system attacks and destroys the beta cells in the pancreas that make insulin." },
                  //   { title: "Username & Password", description: "Multiple sclerosis (MS) is an autoimmune disease in which the body's immune system mistakenly attacks myelin, the fatty substance that surrounds and protects the nerve fibers in the central nervous system." },
                  //   { title: "Change Location", description: "Crohn's disease and ulcerative colitis (UC), both also known as inflammatory bowel diseases (IBD), are autoimmune diseases in which the body's immune system attacks the intestines." },
                  // ];
                // shownGroup = null;
  ionViewDidLoad() {
    console.log("I'm alive!");
  }
                  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,
              public platform: Platform,private facebook: Facebook,public actionSheetCtrl: ActionSheetController,private camera: Camera ,public alertCtrl: AlertController,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
                    this.showProfile();
                   this.itemsClose = 0;
                   var cdate = new Date();
       console.log(cdate.getDate());
  
                  }
                serializeObj(obj){
                    var result = [];
                
                    for (var property in obj)
                    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                    return result.join("&");
                }
                //     toggleGroup(group) {
                //     if (this.isGroupShown(group)) {
                //         this.shownGroup = null;
                //     } else {
                //         this.shownGroup = group;
                //     }
                // }
                  
                // isGroupShown(group) {
                //     return this.shownGroup === group;
                // }
                active(ids){
                  var data = {
                    id : ids
                  }
                  let headers = new Headers();
                  headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                  let options= new RequestOptions({ headers: headers });
                  var serialized_data = this.serializeObj(data); 
                  console.log(serialized_data);
                  var url:string = this.appsetting.myGlobalVar+'en/account/api_actveinactivepost';
                  this.http.post(url, serialized_data, options).map(res=>res.json()).subscribe(datares=>{
                        console.log(datares);
                        this.checkactive = datares.postdata[0].status;
                        this.showProfile();
                //  alert("img ->"+data);
                //  alert("img ->"+JSON.stringify(data));
               
                })

                }

                notiPage(){
                    this.navCtrl.push(NotificationPage);
                  }

                offrPage(advId){
                    this.navCtrl.push(ItemofferPage,{advertise_id : advId});
                  }
                showlist(){
                  this.navCtrl.push(ChatlistPage);
                }
                openActionSheet(){
                this.User_id = localStorage.getItem("USERID");
                console.log('opening');
                let actionsheet = this.actionSheetCtrl.create({
                title:"Choose Album",
                buttons:[{
                text: 'Camera',
                handler: () => {
                console.log("Camera Clicked");
                  // alert("harman take Picture")
                  const options: CameraOptions = {
                  quality: 8,
                  sourceType : 1,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE
                }
                this.camera.getPicture(options).then((imageData) => {
                  
                  
                  this.srcImage = 'data:image/jpeg;base64,' + imageData;
                  localStorage.setItem("IMG", this.srcImage);
                  this.profile_image =  imageData; 
                    var data_img = ({
                                id : this.User_id,
                                img : this.profile_image
                      })
                  
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.appsetting.myGlobalVar+'en/account/api_saveavatar';
                    this.http.post(url, serialized_img, options).map(res=>res.json()).subscribe(data=>{
                          
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                  if(data.error == 0){
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }else{
                                  let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                  }

                    })
                }, (err) => {
                alert("Server not Working,Please Check your Internet Connection and try again!");
                });
                }
                },{
                text: 'Gallery',
                handler: () => {
                                const options: CameraOptions = {
                                quality: 20,
                                sourceType : 0,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                              }
                              this.camera.getPicture(options).then((imageUri) => {
                              this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                                localStorage.setItem("IMG", this.srcImage);
                              this.profile_image =  imageUri;
                                          var datag_img = ({
                                            id : this.User_id,
                                            img : this.profile_image
                                  })
                              
                                var serializedg_img = this.serializeObj(datag_img); 
                                console.log(serializedg_img);
                                let headers = new Headers();
                                headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                                let options= new RequestOptions({ headers: headers });
                            
                                var url:string = this.appsetting.myGlobalVar+'en/account/api_saveavatar';
                                this.http.post(url, serializedg_img, options).map(res=>res.json()).subscribe(data=>{
                              if(data.error == 0){
                            let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              toast.present();
                              }else{
                                let toast = this.toastCtrl.create({
                                  message: data.msg,
                                  duration: 3000
                              });
                              }
                            })
                              }, (err) => {
                              alert("Server not Working,Please Check your Internet Connection and try again!");
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


                chat(){
                    this.navCtrl.push(ChatPage);
                }




                showProfile(){
                  this.Loading.present();
                    this.User_id = localStorage.getItem("USERID");
                    console.log(this.User_id);
                      var data_all = ({
                                id : this.User_id
                      })
                    var serialized_all = this.serializeObj(data_all); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                
                    var url:string = this.appsetting.myGlobalVar+'en/account/api_getuserdetail';
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                      
                        console.log(data);
                        if(data.error == 0){
                          console.log(data.data);
                          console.log(data.data);
                          this.data = data.data;
                        
                         
                          this.srcImage = data.data.profile_photo;
                          this.autocomplete.query = data.data.address;
                          console.log(this.srcImage);
                          this.fb_id = data.data.fb_id;
                          console.log(this.fb_id);
                          console.log(this.data);
                          console.log("also here!!!")
                          var single_id = {
                            uid : this.User_id
                          }
                    var serialized_single = this.serializeObj(single_id); 
                    console.log(serialized_single);

                  var linksingle :string = this.appsetting.myGlobalVar+'en/account/api_post_by_user';
                  this.http.post(linksingle, serialized_single, options).map(res=>res.json()).subscribe(resp=>{
                    this.Loading.dismiss();
                        console.log(resp);
                        if(resp.error == 0){
                          console.log(resp);
                          // for(var j=0;j<=resp.searchresult.length;j++){
                            // resp.searchresult[j].gallery = resp.searchresult[j].gallery.split('rahul')[0];
                            console.log("resp");
                            console.log(resp);
                            this.listItems = resp.searchresult;
                            
                          // }
                          

                        }
                  })
                          }else{
                            // alert("TRY AGAIN!");
                            let toast = this.toastCtrl.create({
                              message: 'TRY AGAIN!',
                              duration: 3000
                            });
                            toast.present();
                          }
                          this.Loading.dismiss();
                              }
                              );
                          }
                public UpdatePass(PassForm){
                console.log(PassForm);
                console.log(PassForm.value.oldpass);
                console.log(PassForm.value.newpass);
                console.log(PassForm.value.cpass);
                this.Loading.present();
                      var data_pass = {
                            id    : this.User_id,
                            old_password : PassForm.value.oldpass,
                            new_password : PassForm.value.newpass
                              }
                  
                    var serialized_all = this.serializeObj(data_pass); 
                    console.log(serialized_all);
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                        if(PassForm.value.newpass == PassForm.value.cpass)
                    {
                    var url:string = this.appsetting.myGlobalVar+'en/account/api_update_password';
                    this.http.post(url, serialized_all, options).map(res=>res.json()).subscribe(data=>{
                        console.log(data);
                        if(data.error == 0){
                              let toast = this.toastCtrl.create({
                              message: data.msg,
                              duration: 3000
                              });
                              toast.present();
                              PassForm.reset();

                              this.bitclose = 0;
                        }else{
                            let toast = this.toastCtrl.create({
                              message: data.msg,
                              duration: 3000
                              });
                              toast.present();
                        }
                          });
                    }else{
                              let toast = this.toastCtrl.create({
                              message: 'NewPassword and ConfirmPassword fiels do not match!',
                              duration: 3000
                              });
                              toast.present();
                        }
                            this.Loading.dismiss();
                  }





                  editdata(){
                    console.log(this.fb_id);
                      // alert("edit");
                    console.log(this.bit);
                    this.bit = 2;
                    console.log(this.bit);
                  }

                  saveform(editform){
                    this.UID = localStorage.getItem("USERID");

                    var data_Profile = {
                      id: this.UID,
                      // useremail: editform.value.user_email,
                      first_name : editform.value.first_name,
                      last_name : editform.value.last_name,
                      // username : editform.value.user_name,
                      country : editform.value.country,
                      phone : editform.value.phone
                    }
                    console.log(data_Profile);
                    // alert(JSON.stringify(data_Profile));
                    var serialized = this.serializeObj(data_Profile);
                    console.log(serialized);
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    let options = new RequestOptions({ headers: headers });
                    var url: string = this.appsetting.myGlobalVar + 'en/account/api_editprofile';
                    this.http.post(url, serialized, options).map(res => res.json()).subscribe(data => {
                      console.log(data);
                      this.bit = 1;
                      if (data.error == 0) {  
                        console.log(data);
                      let toast = this.toastCtrl.create({
                        message: data.msg,
                        duration: 3000
                      });
                    toast.present();
                      } else {
                    let toast = this.toastCtrl.create({
                      message: 'TRY AGAIN!',
                      duration: 3000
                    });
                    toast.present();
                      }
                      this.Loading.dismiss();

                    }, err => {
                      // alert("Invalid data");
                      let toast = this.toastCtrl.create({
                      message: "Invalid data",
                      duration: 3000
                    });
                    toast.present();
                      console.log("Error");
                      this.Loading.dismiss();
                      console.log("Error!:", err);
                    });
                  }
                  changelocation(){
                        this.bitclose = 1;
                  }
                userpass(){
                  this.bitclose = 2;
                }



              


          logout(): firebase.Promise<any> {
           var currentuser =  localStorage.getItem("USER_DATA");
            let loadings = this.loadingCtrl.create({
              content: 'Logging Out...'
            });
            loadings.present();
            console.log(currentuser);
          if(this.fb_id != '' || this.fb_id != null){
              return this.afAuth.auth.signOut().then((suc)=>{
                  // alert(JSON.stringify(suc));
                    this.facebook.logout().then((response)=>{
              loadings.dismiss();
                    //   alert("fbsucclOG -> "+JSON.stringify(response))
                      localStorage.clear();
                      this.navCtrl.push(HomePage);
                  }).catch((error)=>{
              loadings.dismiss();
                        localStorage.clear();
                    // alert("fbError -> "+JSON.stringify(error))
                        this.navCtrl.push(HomePage);
                  })
                }).catch((err)=>{
                   loadings.dismiss();
                   //  alert('err'+JSON.stringify(err));
                  this.facebook.logout().then((response)=>{
                    //  alert("fbsucclOG -> "+JSON.stringify(response))
                      localStorage.clear();
                      this.navCtrl.push(HomePage);
                  }).catch((error)=>{
                    loadings.dismiss();
                    // alert("fbError -> "+JSON.stringify(error))
                      localStorage.clear();
                      this.navCtrl.push(HomePage);
                  })
                });
          }else{
          loadings.dismiss();
          localStorage.clear();
          // localStorage.removeItem('USERID');
          // localStorage.removeItem('USER_DATA');
          console.log(currentuser);
          this.navCtrl.push(HomePage);
          }
                }

                changeaddress(myadd){
                  console.log(myadd);
               
                  let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    let options = new RequestOptions({ headers: headers });
                var link_map : string =  'https://maps.googleapis.com/maps/api/geocode/json?address='+myadd+'&key=AIzaSyA-Bf-YDZaK56ATPH3h8Z4MVa963PFCofs';

                      this.http.get(link_map,options).map(res => res.json()).subscribe(data => {
                                  console.log(data);
                                  console.log(data.results[0].geometry.location);
                                  console.log(data.results[0].geometry.location.lat);
                                  this.lat_add  = data.results[0].geometry.location.lat;
                                  console.log(data.results[0].geometry.location.lng);
                                  this.lng_add =  data.results[0].geometry.location.lng;
                    var update: string = this.appsetting.myGlobalVar + 'en/account/api_editlocation';
                    var updateloc = {
                      id : this.User_id,
                      address : myadd,
                      latitude : this.lat_add,
                      longitude : this.lng_add
                    }

                    var serialize = this.serializeObj(updateloc);
                    console.log(serialize);
                    this.http.post(update, serialize, options).map(res => res.json()).subscribe(data => {
                      console.log(data);
                      if(data.error == 0){
                        let toast = this.toastCtrl.create({
                          message: data.msg,
                          duration: 3000
                        });
                         toast.present();
                          this.bitclose = 0;
                      }else{
                            let toast = this.toastCtrl.create({
                          message: data.msg,
                          duration: 3000
                        });
                         toast.present();
                      }
                    
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

        chooseItem(items){
          console.log(items);
          this.autocomplete.query = items;
          this.autocompleteItems = [];
        }

        delpost(pidd){
          this.UID = localStorage.getItem("USERID");
                  // alert(pidd)
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    let options = new RequestOptions({ headers: headers });
                    var link_del: string = this.appsetting.myGlobalVar + 'en/account/api_deletepost';

                var delete_data = {
                  id : pidd,
                  uid : this.UID
                }
                    var serialize_del = this.serializeObj(delete_data);
                    console.log(serialize_del);
                 this.http.post(link_del,serialize_del,options).map(res => res.json()).subscribe(data => {
                        console.log(data);
                         let toast = this.toastCtrl.create({
                          message: data.msg,
                          duration: 3000
                        });
                         toast.present();
                         this.showProfile();
                 })

        }


       delfav(postid){
                    this.User_id = localStorage.getItem("USERID");
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    let options = new RequestOptions({ headers: headers });
                    var link_del: string = this.appsetting.myGlobalVar + 'en/account/api_remove_favpost_byuser';

                    var delete_fav = {
                      uid : this.User_id,
                      post_id : postid
                    }
                var serialize_del = this.serializeObj(delete_fav);
                console.log(serialize_del);
                this.http.post(link_del,serialize_del,options).map(res => res.json()).subscribe(data => {
                        console.log(data);
                        if(data.error == 0){
                         let toast = this.toastCtrl.create({
                          message: "Deleted Successfully!",
                          duration: 3000
                        });
                         toast.present();
                         this.favo();
                        }else{
                          let toast = this.toastCtrl.create({
                            message: data.msg,
                            duration: 3000
                          });
                           toast.present();
                        }
                 })


       }


        editpost(post_id){
          console.log("post"+post_id)
          this.navCtrl.push(PosteditPage , { id : post_id });
        }
        favo(){
          this.Loading.present();
          this.itemsClose = 1;
          this.UID = localStorage.getItem("USERID");
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
          let options = new RequestOptions({ headers: headers });
          var link_fav: string = this.appsetting.myGlobalVar + 'en/account/api_favlist_by_user';

                var favo_list = {
                  uid :  this.UID 
                }

          var serialize_fav = this.serializeObj(favo_list);
          console.log(serialize_fav);
          this.http.post(link_fav,serialize_fav,options).map(res => res.json()).subscribe(data => {
          this.Loading.dismiss();
          console.log(data);
          console.log(data.postfavourite);
          this.favolist = data.postfavourite;
          // let toast = this.toastCtrl.create({
          //                 message: data.msg,
          //                 duration: 3000
          //               });
          // toast.present();
       
                 })
        }
        setting(){
          this.itemsClose = 1;
        }
        myitemsacc(){
          this.itemsClose = 1;
        }
        doYourStuff(){
          this.navCtrl.push(MainPage);
        }
        singledetail(pid){
          console.log(pid);
          this.navCtrl.push(AdvertisePage,{postid:pid});
        }
                }
