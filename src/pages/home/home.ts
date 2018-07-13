import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Global} from '../../global';
import { ToastController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {MyApp} from '../../app/app.component';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LoginPage]
})
export class HomePage {
  
 public displayName: any;
 public  email: any;
 public familyName: any;
 public  givenName: any;
  userId: any;
 public imageUrl: any;
 public isLoggedIn:boolean=false;

  public userF: any ;
  public photoFacebook:any;
  public emailFacebook:any;
  public nombreFacebook:any;
  public isLoggedInFacebook:boolean=false;
  public loginWith:string;
  public showUser: boolean = false;
  
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private nativeStorage:NativeStorage,
    private toastCtrl: ToastController,
    public login : LoginPage) 
     {
   
  
   
  }
  ionViewWillEnter(){
  
   // this.navCtrl.setRoot(LoginPage)
   this.onLoad();
  }
  onLoad(){
    
    this.nativeStorage.getItem('loginStatus')
    .then(
      data => {
          if (data.loginWith=='google') {
          
            this.presentToast('google');

                this.nativeStorage.getItem('userGoogle')
                .then(
                  data => {this.displayName = data.nameG, this.email = data.emailG, this.imageUrl = data.pictureG, this.isLoggedIn = true},
                
                  error => {this.navCtrl.setRoot(LoginPage)}
                );
                
          }else if(data.loginWith=='facebook'){
            this.presentToast('facebook');
            this.nativeStorage.getItem('userFacebook')
            .then(
              data => {this.nombreFacebook = data.nameF, this.email = data.emailF, this.photoFacebook = data.pictureF, this.isLoggedInFacebook = true},
              error => {this.navCtrl.setRoot(LoginPage);}
            );
                
          }
        
      },error => {this.navCtrl.setRoot(LoginPage)}     
    );     

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

  
  


}
