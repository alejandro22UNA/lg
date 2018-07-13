import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: HomePage;

   displayName: any;
   email: any;
   familyName: any;
   givenName: any;
   userId: any;
   imageUrl: any;
   isLoggedIn:boolean=false;
 
    userF: any ;
    photoFacebook:any;
    emailFacebook:any;
    nombreFacebook:any;
    isLoggedInFacebook:boolean=false;
    loginWith:string;
    showUser: boolean = false;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private nativeStorage:NativeStorage) {

                this.nativeStorage.getItem('loginStatus')
                .then(
                  data => {
                      if (data.loginWith=='google') {
                            this.nativeStorage.getItem('userGoogle')
                            .then(
                              data => {this.displayName = data.nameG, this.email = data.emailG, this.imageUrl = data.pictureG, this.isLoggedIn = true},
                            
                              error => {console.log(error)}
                            );
                            
                      }else if(data.loginWith=='facebook'){                      
                        this.nativeStorage.getItem('userFacebook')
                        .then(
                          data => {this.nombreFacebook = data.nameF, this.email = data.emailF, this.photoFacebook = data.pictureF, this.isLoggedInFacebook = true},
                          error => {console.log(error)}
                        );
                            
                      }
                    
                  },error => {console.log(error)}     
                );  
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    
    this.pages = [
      { title: 'INICIO', component: HomePage },
      { title: 'LOGIN', component: LoginPage }
    ];



  }
  checkLogin(){

  }
  initializeApp() {
    this.platform.ready().then(() => {
 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
     this.splashScreen.hide();
    this.nav.setRoot(HomePage);

    });
    
      
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
