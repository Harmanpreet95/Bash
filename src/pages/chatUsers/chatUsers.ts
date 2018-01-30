                import { Component } from '@angular/core';
                import { NavController,NavParams } from 'ionic-angular';
                import {Http, Headers, RequestOptions} from '@angular/http';
                import { Appsetting } from '../../providers/appsetting';
                import {LoadingController} from 'ionic-angular';
                import { ToastController } from 'ionic-angular';
                import { AlertController } from 'ionic-angular';
                import {Camera,CameraOptions} from '@ionic-native/camera';
                import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-chat',
  templateUrl: 'chatUsers.html'
})
export class ChatUsersPage {
  post_name: any;
  showblank: number;
  url_full: string;
  data_list_show: any;
  logged: any;
  text: any;
  created_by: any;
  post: any;
  chatall: any;
  message: string;
  advertise: any;
  profile_image: any;
  srcImage: string;
  User_id: string;

  constructor(public navCtrl: NavController,public navParams: NavParams,public actionSheetCtrl: ActionSheetController,private camera: Camera ,public alertCtrl: AlertController,public toastCtrl: ToastController,public appsetting: Appsetting,public loadingCtrl:LoadingController, public http:Http) {
         this.advertise = this.navParams.get('postadv');
         this.post_name = this.navParams.get('postname');
         console.log(this.advertise);
         this.url_full = 'http://rakesh.crystalbiltech.com/ads/uploads/profile_photos/';
         this.showChat();
         this.showList();
  }
           serializeObj(obj){
                    var result = [];
                
                    for (var property in obj)
                    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                    return result.join("&");
                }
 openActionSheet(){
                this.User_id = localStorage.getItem("USERID");
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
                  
                  
                  // this.srcImage = 'data:image/jpeg;base64,' + imageData;
                  // localStorage.setItem("IMG", this.srcImage);
                  this.profile_image =  imageData; 
                  this.created_by = this.navParams.get('creat_user');
                    this.User_id = localStorage.getItem("USERID");
                    this.logged = this.navParams.get('login_user_id');
                    this.post = this.navParams.get('postadv');
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
            
                    var chat_data_image = ({
                                            from : this.User_id,
                                            to : this.logged,
                                            message : this.profile_image,
                                            file : 1,
                                            post_id : this.advertise
                                  })
                    var serial_chat_img = this.serializeObj(chat_data_image); 
                    console.log(serial_chat_img);  
                    var url_chat:string = this.appsetting.myGlobalVar+'en/account/api_userchat';
                    this.http.post(url_chat, serial_chat_img, options).map(res=>res.json()).subscribe(data_chat=>{
                    if(data_chat.error == 0){

                         let alert = this.alertCtrl.create({
                          title: '',
                          message: data_chat.msg,
                          cssClass:'alrt',
                          buttons: ['OK']
                        });
                        alert.present();
                       this.showChat();
         this.showList();
                    }
                  })
 
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
                              // this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                              //   localStorage.setItem("IMG", this.srcImage);
                              this.profile_image =  imageUri;
                    this.created_by = this.navParams.get('creat_user');
                    this.User_id = localStorage.getItem("USERID");
                    this.logged = this.navParams.get('login_user_id');
                    this.post = this.navParams.get('postadv');
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
            
                    var chat_data_image = ({
                                            from : this.User_id,
                                            to : this.logged,
                                            message : this.profile_image,
                                            file : 1,
                                            post_id : this.advertise
                                  })
                    var serial_chat_img = this.serializeObj(chat_data_image); 
                    console.log(serial_chat_img);  
                    var url_chat:string = this.appsetting.myGlobalVar+'en/account/api_userchat';
                    this.http.post(url_chat, serial_chat_img, options).map(res=>res.json()).subscribe(data_chat=>{
                    if(data_chat.error == 0){

                         let alert = this.alertCtrl.create({
                          title: '',
                          message: data_chat.msg,
                          cssClass:'alrt',
                          buttons: ['OK']
                        });
                        alert.present();
                         this.showChat();
         this.showList();
                    }
                  })        
                           
                            /////////////////////////////////////////////////////
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

chat(user_with_id){
                    this.message = '';
                 
                   
                    this.User_id = localStorage.getItem("USERID");
                    this.post = this.navParams.get('postadv');
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
            
                    var chat_data_show = ({
                                            myid : this.User_id,
                                            otherid :  user_with_id,
                                            post_id : this.post
                                         
                                  })
                    var serial_chat_img = this.serializeObj(chat_data_show); 
                    console.log(serial_chat_img);  
                    var url_chat_show:string = this.appsetting.myGlobalVar+'en/account/api_onetooneallchat';
                    this.http.post(url_chat_show, serial_chat_img, options).map(res=>res.json()).subscribe(data_show=>{
                    if(data_show.error == 0){
 
                       console.log(data_show.msg);
                       this.chatall = data_show.msg;
                    }else{
                      this.showblank = 1;
                    }
                    })
}
                showChat(){
                     this.message = '';
                    this.created_by = this.navParams.get('creat_user');
                    this.logged = this.navParams.get('login_user_id');
                    this.User_id = localStorage.getItem("USERID");
                    this.post = this.navParams.get('postadv');
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
            
                    var chat_data_show = ({
                                            myid : this.User_id,
                                            otherid :  this.logged,
                                            post_id : this.post
                                         
                                  })
                    var serial_chat_img = this.serializeObj(chat_data_show); 
                    console.log(serial_chat_img);  
                    var url_chat_show:string = this.appsetting.myGlobalVar+'en/account/api_onetooneallchat';
                    this.http.post(url_chat_show, serial_chat_img, options).map(res=>res.json()).subscribe(data_show=>{
                    if(data_show.error == 0){
 
                       console.log(data_show.msg);
                       this.chatall = data_show.msg;



                    }
                    })
                }
showList(){
  this.url_full = 'http://rakesh.crystalbiltech.com/ads/uploads/profile_photos/';
                    this.User_id = localStorage.getItem("USERID");
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
                    this.post = this.navParams.get('postadv');
                    var chat_list = ({
                                            myid :  this.User_id,
                                            post_id : this.post
                                  })
                    var serial_chat_list = this.serializeObj(chat_list); 
                    console.log(serial_chat_list);  
                    var url_chat_list:string = this.appsetting.myGlobalVar+'en/account/api_myunreadchatlist';
                    this.http.post(url_chat_list, serial_chat_list, options).map(res=>res.json()).subscribe(data_list=>{
                    if(data_list.error == 0){
                        console.log(data_list.msg);
                        this.data_list_show = data_list.msg
                        let alert = this.alertCtrl.create({
                          title: '',
                          message: data_list.msg,
                          cssClass:'alrt',
                          buttons: ['OK']
                        });
                    }else{

                    }
                    })

}
                sendMessage(msg){
                  this.text = msg;
                  if(this.profile_image == undefined || this.profile_image == '' ){
                    this.created_by = this.navParams.get('creat_user');
                    this.User_id = localStorage.getItem("USERID");
                    this.logged = this.navParams.get('login_user_id');
                    this.post = this.navParams.get('postadv');
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
            
                    var chat_data = ({
                                            from : this.User_id,
                                            to : this.logged,
                                            message : this.text,
                                            file : 0,
                                            post_id : this.post
                                  })
                    var serial_chat = this.serializeObj(chat_data); 
                    console.log(serial_chat);  
                    var url_chat:string = this.appsetting.myGlobalVar+'en/account/api_userchat';
                    this.http.post(url_chat, serial_chat, options).map(res=>res.json()).subscribe(data=>{
                    if(data.error == 0){
                        

                        this.showChat();

                    }else{
                          let alert = this.alertCtrl.create({
                          title: '',
                          message: data.msg,
                          cssClass:'alrt',
                          buttons: ['OK']
                        });
                        alert.present();
                    }
                  })
                  }else{
                    this.created_by = this.navParams.get('creat_user');
                    this.User_id = localStorage.getItem("USERID");
                    this.logged = this.navParams.get('login_user_id');
                    this.post = this.navParams.get('postadv');
                    let headers = new Headers();
                    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
                    let options= new RequestOptions({ headers: headers });
            
                    var chat_data_image = ({
                                            from : this.User_id,
                                            to : this.logged,
                                            message : this.profile_image,
                                            file : 1,
                                            post_id : this.advertise
                                  })
                    var serial_chat_img = this.serializeObj(chat_data_image); 
                    console.log(serial_chat_img);  
                    var url_chat:string = this.appsetting.myGlobalVar+'en/account/api_userchat';
                    this.http.post(url_chat, serial_chat_img, options).map(res=>res.json()).subscribe(data_chat=>{
                    if(data_chat.error == 0){


                        this.showChat();
                    }else{
                          let alert = this.alertCtrl.create({
                          title: '',
                          message: data_chat.msg,
                          cssClass:'alrt',
                          buttons: ['OK']
                        });
                        alert.present();
                    }
                  })
                  }
                }
}
