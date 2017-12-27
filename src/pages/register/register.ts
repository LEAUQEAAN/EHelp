import { Component } from '@angular/core';
import {   NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device'; 
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  protected uname: string;
  protected usex: string;
  protected uphone: string;
  protected scenic: string;

  uuid:string = "11";

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public device:Device) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    //alert(this.device.uuid);
    if(this.device.uuid!=null){
      this.uuid = this.device.uuid;
    } 
    // alert(this.uuid);
  }


  Check(usercode: HTMLInputElement){
	    this.http.request(window.localStorage.getItem('host')+'/worker/loadById/'+usercode.value)
		  .toPromise()
		  .then(res =>{
         // alert(JSON.stringify(res.json(), null, 4));
		  	let worker = res.json(); 
        if(worker.worker_code=='-1'){
          alert('对不起,你还没有资格注册！');
          return;
        }
        if(worker.worker_serviceid!=null){
          alert('对不起,你已注册！');
          return;
        } 
  			this.uname = worker.worker_name;
  			this.usex = worker.worker_sex;
  			this.uphone = worker.worker_phone;
  			this.scenic = worker.scenic_code;
		  })
		  .catch(err => {alert(err); });  
  }
 
  Register(usercode: HTMLInputElement,username: HTMLInputElement,  usersex: HTMLInputElement,userdept: HTMLInputElement,userphone: HTMLInputElement,password1: HTMLInputElement,password2: HTMLInputElement){
    if(password1.value!=password2.value){
        alert("两次密码不一致！");
    }else{ 
      this.http.request(window.localStorage.getItem('host')+'/worker/register/'
      +usercode.value+'/'+username.value+'/'
      +usersex.value+'/'+userdept.value+'/'
      +userphone.value+'/'+password1.value+'/'+this.uuid)
      .toPromise()
      .then(res =>{ 
        alert(res.json().text);
      })
      .catch(err => {
      alert(err); });   
    } 
  } 
}
