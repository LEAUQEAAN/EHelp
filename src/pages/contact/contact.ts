import { Component } from '@angular/core';
import { ModalController ,AlertController,LoadingController} from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Http } from '@angular/http';  
import 'rxjs/add/operator/toPromise';
import {UserService} from "../../service/user.service"; 
 
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	
 	listData:any;
  interval:any;
  loader:any; 
  constructor(public userservice:UserService,public modalCtrl: ModalController,public http:Http,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() { 
    this.listData = this.userservice.getUserList(window.localStorage.getItem('dept'));
    // alert(JSON.stringify(this.listData,null,4)); 
    /*  this.db.myAppDB.executeSql("select * from worker where scenic_code = ? ;",[window.localStorage.getItem('dept')]).then((data)=>{
        alert(JSON.stringify(data,null,4)); 
        for (let i = 0 ; i < data.rows.length; i++) {
            this.listData[i] = data.rows.item(i);
        } 
    },(error)=>{});

   this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "载入中....."
    });
    this.loader.present();

    this.interval=setInterval(() => {
         this.initData();
    }, 500); */
  }

  initData(){ 
 

      this.http.request(window.localStorage.getItem('host')+'/worker/list/'+window.localStorage.getItem('dept')).toPromise()
        .then(res =>{ 
          //alert(JSON.stringify(res.json(), null, 4)); 
          this.listData = res.json();  
          

         if(this.loader!=null){
            this.loader.dismiss();
           }
        })
        .catch(err => { });
  }
  
  ChatInfo() {
    let modal = this.modalCtrl.create(ChatPage);
    modal.present();
  } 

  call(name:any,phone:any){
    let confirm = this.alertCtrl.create({ 
      subTitle: '确认呼叫'+name.innerText+'['+phone.value+']'+'?',
      buttons: [
        {
          text: '确认',
          handler: () => { 
            window.location.href = "tel:" + phone.value;
          }
        },
        {
          text: '取消',
          handler: () => {

          }
        }
      ]
     });
    confirm.present(); 
  }

  ionViewDidLeave(){ 
      clearInterval(this.interval); 
  }

}
