import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,ModalController,NavParams  } from 'ionic-angular';
import { AlarmPage } from '../alarm/alarm';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var BMap;
declare var baidumap_location;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('allmap') map_container: ElementRef;
  	map: any;//地图对象
  	lo:any; //= 116.404;
	al:any;//= 39.915;
	r:any ;
	mk:any;
	geoc:any;
	loader:any;
	listData:Object;

 	constructor(public geolocation: Geolocation,public modalCtrl: ModalController,public navCtrl: NavController,public params: NavParams, public http: Http,public loadingCtrl: LoadingController){
 		this.lo  = window.localStorage.getItem('longitude');
 		this.al  = window.localStorage.getItem('latitude');
 	}

    ionViewDidEnter() {

		let ggPoint= new BMap.Point(this.lo,this.al );
        this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });
      	this.map.addOverlay(new BMap.Marker(ggPoint));
      	this.map.centerAndZoom(ggPoint, 15);
      	this.map.panTo(ggPoint);
      	this.map.enableScrollWheelZoom();

	 	baidumap_location.getCurrentPosition(function (r) {
	 		//alert(JSON.stringify(r,null,4));
	        window.localStorage.setItem('addr',r.addr+'('+r.locationDescribe+')');
	        window.localStorage.setItem('longitude',r.longitude);
	        window.localStorage.setItem('latitude',r.latitude);
	    }, function (error) {
	    	//alert(JSON);

	    });

	 }



	 alarm(){
	   /* let modall = this.modalCtrl.create(AlarmPage);
	 	modall.present();*/
     this.navCtrl.push(AlarmPage);

	 }



}
