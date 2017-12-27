import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the AlterinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-alterinfo',
  templateUrl: 'alterinfo.html'
})
export class AlterinfoPage {

  protected worker={worker_code:'',worker_name:'',worker_sex:'',scenic_code:'',worker_phone:''};

  loader:any;
  constructor(public navCtrl: NavController,public http: Http,public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl: AlertController) {
 	
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterinfoPage'); 
     this.loader = this.loadingCtrl.create({
        spinner: 'crescent',
        content: "载入中..."   
      }); 
      this.loader.present();

      this.http.request(window.localStorage.getItem('host')+'/worker/loadById/'+ window.localStorage.getItem('usercode'))
      .toPromise()
      .then(res =>{ 
          this.worker = res.json();   
           if(this.loader!=null) this.loader.dismiss();
      })
      .catch(err => {
      if(this.loader!=null) this.loader.dismiss();
      this.showMsg(err); });
  }


  AlterInfo(usercode:any,username:any,usersex:any,userdept:any,userphone:any){

       if(userphone.value=='') return ;
       this.loader = this.loadingCtrl.create({
        spinner: 'crescent',
        content: "信息修改中..."   
      }); 
      this.loader.present();
      this.http.request('http://'+window.localStorage.getItem('host')+'/RestServer/worker/alterinfo/'+usercode.value+'/'+username.value+'/'+usersex.value+'/'+userdept.value+'/'+userphone.value)
        .toPromise()
        .then(res =>{
            if(this.loader!=null) this.loader.dismiss();
            this.showMsg(res.json().text);

        })
        .catch(err => {
        if(this.loader!=null) this.loader.dismiss();
        this.showMsg(err); });
  }

    showMsg(info:string){
    let alert1 = this.alertCtrl.create({ 
      subTitle: info,
      buttons: ['OK']
    });
    alert1.present();
  }

}
