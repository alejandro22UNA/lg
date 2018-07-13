import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

 items: Array<{title: string, note: string, icon: string}>;
 selectedItem :any;
 icons:any=[];
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public login:LoginPage) {
    // If we navigated to this page, we will have an item available as a nav param
/*
    this.displayName = this.login.displayName;
    this.email = this.login.email;
    this.familyName = this.login.familyName;
    this.givenName = this.login.userId;
    this.imageUrl = this.login.imageUrl;
    */
    //this.isLoggedIn = this.login.isLoggedIn;

    this.selectedItem = navParams.get('item');

    //Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    
  }

  

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  
 /*
  logout(){
    this.login.logout();
  }
  log_in(){
    this.login.login();
  }
  */
}

  

