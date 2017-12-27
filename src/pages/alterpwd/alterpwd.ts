import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

 
@Component({
  selector: 'page-alterpwd',
  templateUrl: 'alterpwd.html'
})
export class AlterpwdPage {

  loader:any;
  constructor(public navCtrl: NavController, public http: Http,public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterpwdPage');
  }

AlterPwd(old:any,new1:any,new2:any){
	if(old.value=='' && new1.value=='' && new2.value==''){
	 	return ;
	}

	if(new1.value!=new2.value){
		this.showMsg("两次密码不一致！");
		return ;
	}
	  this.loader = this.loadingCtrl.create({
        spinner: 'crescent',
        content: "密码修改中..."
      });
      this.loader.present();
      this.http.request(window.localStorage.getItem('host')+'/worker/alterpwd/'+window.localStorage.getItem('usercode')+'/'+old.value+'/'+new1.value)
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
