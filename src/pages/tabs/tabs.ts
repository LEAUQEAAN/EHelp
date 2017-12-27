import { Component ,ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PersonPage } from '../person/person';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Vibration } from '@ionic-native/vibration';
import { Dialogs } from '@ionic-native/dialogs';
import { BackButtonService } from "../../service/backButton.service";
import {DB} from "../../service/DB";
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    tabRoots:any;
	interval:any;
	usercode:any;
  	@ViewChild('myTabs') tabRef: Tabs;

  	constructor(private localNotifications:LocalNotifications,private db:DB ,private backButtonService:BackButtonService,public platform:Platform ,public http:Http, private vibration: Vibration,private dialogs: Dialogs) {
  		this.usercode = window.localStorage.getItem('usercode');

	    this.tabRoots = [
	      {
	        root: HomePage,
	        tabTitle: '位置',
	        tabIcon: 'navigate',
	        tabBadge:'',
	        tabBadgeStyle:'light'
	      },
	      {
	        root: ContactPage,
	        tabTitle: '朋友',
	        tabIcon: 'contacts',
	        tabBadge:'',
	        tabBadgeStyle:'light'
	      },
	      {
	        root: AboutPage,
	        tabTitle: '资讯',
	        tabIcon: 'paper',
	        tabBadge:'',
	        tabBadgeStyle:'light'
	      },
	      {
	        root: PersonPage,
	        tabTitle: '设置',
	        tabIcon: 'settings',
	        tabBadge:'',
	        tabBadgeStyle:'light'
	      }
	    ];

 		this.platform.ready().then(() => {
 		      this.db.initDatabase();
          this.backButtonService.registerBackButtonAction(this.tabRef);
      	});

  	}

  	ionViewDidLoad() {

  	  this.initworkers();
	  this.interval=setInterval(() => {
         this.initData();
      }, 2000);
	}
  	initData(){
  	 this.http.request(window.localStorage.getItem('host')+'/recmsg/getnewinfo/'+this.usercode)
        .toPromise()
        .then(res =>{
        	let tx = res.json().text;
        	if(tx=='0'){
        		this.tabRoots[0].tabBadge = '';
        		this.tabRoots[0].tabBadgeStyle ='light';
            this.localNotifications.clear(1);
        	}else{
        		if(this.tabRoots[0].tabBadge !=  tx){

              this.localNotifications.schedule({
                id: 1,
                title: '新消息',
                text: '你有'+tx+'条消息未读',
              });
              if(this.tabRoots[0].tabBadge < tx) {
                this.vibration.vibrate([2000, 1000, 2000, 1000, 2000]);
                this.dialogs.beep(3);
              }
        		}

        		this.tabRoots[0].tabBadge =  tx;
        		this.tabRoots[0].tabBadgeStyle ='danger';
        	}
        })
        .catch(err => {
         alert(err);
        });
	}


	initworkers(){

		 this.http.request(window.localStorage.getItem('host')+'/worker/list/'+window.localStorage.getItem('dept')).toPromise()
        .then(res =>{
          //alert(JSON.stringify(res.json(), null, 4)) ;
          let listData = res.json();
          if(listData.length > 0 ) {
          	this.db.myAppDB.executeSql("delete from worker;",{}).then(()=>console.log("clear wokers")).catch(e=>console.log(""));
          }
          for(let i = 0 ; i < listData.length;i++){
          	//alert(JSON.stringify(listData[i],null,4))
          	let a = listData[i];
	       	this.db.myAppDB.executeSql('INSERT INTO worker(worker_code,worker_name,worker_sex'+
		       ',worker_phone,scenic_code,worker_serviceid) VALUES (?,?,?,?,?,?);',
		      [a.worker_code,a.worker_name,a.worker_sex,a.worker_phone,a.scenic_code,a.worker_serviceid])
		     .then(() =>console.log("插入一成功！！"))
		     .catch(e => console.log(e));
          }

        })
        .catch(err => { });


	}

}

