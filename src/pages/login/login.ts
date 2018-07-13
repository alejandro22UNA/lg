import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';
import {Global}   from '../../global';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean = false;

  user: any = {};
  photoFacebook:any;
  emailFacebook:any;
  nombreFacebook:any;
  isLoggedInFacebook:any;
  showUser: boolean = false;
  constructor(
    public navCtrl: NavController,
    private googlePlus: GooglePlus,
    private nativeStorage:NativeStorage,
    private facebook: Facebook,
    private toastCtrl: ToastController
  ) {

  }

  login() {
    this.googlePlus.login({})
      .then(res => {

        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.nativeStorage.setItem('userGoogle',{
          nameG: this.displayName,
          emailG: this.email,
          pictureG: this.imageUrl,
          isLoggedIn:true
        });
        this.nativeStorage.setItem('loginStatus',{
          loginStatus:true,
          loginWith:'google'
        });
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => console.error(err));
  }


  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      //this.presentToast(rta.status);
     
      if(rta.status == 'connected'){

      // this.getInfo();
  
       this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
       .then(data=>{
         //this.presentToast(data);
        // this.showUser = true;
        this.user = data;
         this.photoFacebook=data.picture;
         this.emailFacebook=data.email;
         this.nombreFacebook=data.name;
         this.photoFacebook = this.user.picture.data.url;
         
         this.nativeStorage.setItem('loginStatus',{
          loginStatusfg:true,
          loginWith:'facebook'
        }).then( ()=> {
          this.nativeStorage.setItem('userFacebook',{
            nameF: this.nombreFacebook,
            emailF: this.emailFacebook,
            pictureF:this.photoFacebook,
            isLoggedInFacebook:true
          }).then(()=>{
            //this.presentToast(this.photoFacebook);
            this.navCtrl.setRoot(HomePage); 
          });
        }).catch( error =>{
          this.presentToast('errorPromise');
        }) 
       })
       .catch(error =>{
         console.error( error );
       });

        
          
      };
    })
    .catch(error =>{
      console.error( error );
    });
   
  }

  presentToast(text:any) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  public logoutGoogle(){
    this.googlePlus.logout()
    .then(res => {
    })
    .catch(err => console.error(err));
    this.nativeStorage.remove('userGoogle');
    this.nativeStorage.remove('loginStatus');
    this.navCtrl.setRoot(LoginPage);
  }
  public logoutFace(){
    this.nativeStorage.remove('userFacebook');
    this.nativeStorage.remove('loginStatus');
    this.navCtrl.setRoot(LoginPage);
  }
  
}