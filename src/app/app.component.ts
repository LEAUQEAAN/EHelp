import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
declare var baidumap_location;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.



      if(window.localStorage.getItem('usercode')!=null && window.localStorage.getItem('username')!=null
       && window.localStorage.getItem('dept')&& window.localStorage.getItem('host')){
       this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }

      /* this.rootPage = TestPage;*/

      baidumap_location.getCurrentPosition(function (r) {
        //alert(JSON.stringify(r, null, 4));
        window.localStorage.setItem('addr',r.addr+'('+r.locationDescribe+')');
        window.localStorage.setItem('longitude',r.longitude);
        window.localStorage.setItem('latitude',r.latitude);
       }, function (error) {});

       statusBar.styleDefault();
       splashScreen.hide();


    });
  }


}


