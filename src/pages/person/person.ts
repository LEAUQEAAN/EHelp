import { Component } from '@angular/core';
import { ModalController,NavController ,NavParams} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlterinfoPage } from '../alterinfo/alterinfo';
import { AlterpwdPage } from '../alterpwd/alterpwd';


/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {
  usercode:string="";
  username:string="";
  constructor(public navCtrl:NavController,public modalCtrl: ModalController,public params: NavParams) {}

  ionViewDidLoad() {
    this.usercode = window.localStorage.getItem('usercode');
    this.username = window.localStorage.getItem('username');
  }

  logOut() {
    window.localStorage.removeItem('usercode');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userdept');
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  alterInfo(){
    this.navCtrl.push(AlterinfoPage);
  }

  alterPwd(){
    this.navCtrl.push(AlterpwdPage);
  }

}
