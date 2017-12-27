import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from '../register/register';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';
import { LoadingController,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import  {DB} from "../../service/DB";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*declare var baidumap_location;*/
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  uuid:string = "11";
  loader:any;
  //host:string ='http://localhost:8088/RestServer/json';

  host:string ='http://39.108.5.214:8080/RestServer/json';

  constructor(public  navCtrl:NavController,private db:DB, public modalCtrl: ModalController,public http: Http,public device:Device,public alertCtrl: AlertController,public loadingCtrl: LoadingController ) {
     window.localStorage.setItem('host',this.host);

  }



  ionViewDidLoad() {
    this.db.initDatabase();
    //alert(this.device.uuid);
    if(this.device.uuid!=null){
      this.uuid = this.device.uuid;
    }
    // alert(this.uuid);


/*    baidumap_location.getCurrentPosition(function (r) {
        window.localStorage.setItem('addr',r.addr+'('+r.locationDescribe+')');
        window.localStorage.setItem('longitude',r.longitude);
        window.localStorage.setItem('latitude',r.latitude);
    }, function (error) {}); */

  }
/*  insert(){
     this.myAppDB.executeSql('INSERT INTO worker(worker_code,worker_name,worker_sex'+
       ',worker_phone,scenic_code) VALUES (?,?,?,?,?,?);',
      ['2312312312','LQ','nan','123123123121','12312'])
     .then(() =>alert("插入一成功！！"))
     .catch(e => console.log(e));

  }

    delete(){
     this.myAppDB.executeSql('delete from worker where worker_code = ?;',
      ['2312312312'])
     .then(() =>alert("删除成功！！"))
     .catch(e => console.log(e));
  }

    update(){
     this.myAppDB.executeSql('update worker set worker_name = ?  where worker_code = ?;',
      ['LEAUQEAAN','2312312312'])
     .then(() =>alert("更新成功！！"))
     .catch(e => console.log(e));
  }
  select(){
     this.myAppDB.executeSql("select * from worker",{}).then((data)=>{
     //alert(JSON.stringify(data,null,4));
     alert(JSON.stringify(data.rows.item(0),null,4));
    },(error)=>{
      console.log('查询错误');
    });
  }

   queryUserTable() {
    this.database.executeSql('SELECT * FROM users;'
      , {}).then((data) => console.log('query users table successfully')
      ).catch(e => console.log(e));
  }*/




  showMsg(info:string){
    let alert1 = this.alertCtrl.create({
      title: '消息',
      subTitle: info,
      buttons: ['OK']
    });
    alert1.present();

  }

  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
        this.showMsg("请输入账号");
    } else if (password.value.length == 0) {
        this.showMsg("请输入密码");
    } else {
       // let userinfo: string = '用户名：' + username.value + '密码：' + password.value;
        //alert(userinfo);
       // alert(this.host+'/worker/login/'+username.value+'/'+password.value+'/'+this.uuid);
        this.loader = this.loadingCtrl.create({
                spinner: 'crescent',
                content: "正在登陆"
              });
        this.loader.present();
        this.http.request(this.host+'/worker/login/'+username.value+'/'+password.value+'/'+this.uuid)
        .toPromise()
        .then(res =>{
          let wk = res.json();
          if(!wk.text){
            //alert(JSON.stringify(res.json(), null, 4));
            window.localStorage.setItem('usercode',wk.worker_code);
            window.localStorage.setItem('username',wk.worker_name);
            window.localStorage.setItem('dept',wk.scenic_code);
            window.localStorage.setItem('user',wk);

            if(this.loader!=null)  this.loader.dismiss();
            let modall = this.modalCtrl.create(TabsPage);
            modall.present();
          } else{
            if(this.loader!=null)  this.loader.dismiss();
             this.showMsg(wk.text);
          }
        }).catch(err => {
        if(this.loader!=null)  this.loader.dismiss();
        this.showMsg(err); });
    }
  }


  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

}


