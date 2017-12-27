import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';


import { AlterinfoPage } from '../pages/alterinfo/alterinfo';
import { AlterpwdPage } from '../pages/alterpwd/alterpwd';

import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AlarmPage } from '../pages/alarm/alarm';
import { LoginPage } from '../pages/login/login';
import { PersonPage } from '../pages/person/person';
import { ChatPage } from '../pages/chat/chat';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';
import { Vibration } from '@ionic-native/vibration';
import { Dialogs } from '@ionic-native/dialogs';
import { BackButtonService } from "../service/backButton.service";
import {DB} from "../service/DB";
import {UserService} from "../service/user.service";
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ImagePicker} from '@ionic-native/image-picker';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {FileUtil} from "../service/FileUtil";
import { MediaCapture} from '@ionic-native/media-capture';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    PersonPage,
    ChatPage,
    RegisterPage,
    AlarmPage,
    AlterinfoPage,
    AlterpwdPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true' ,       //隐藏全部子页面tabs
      iconMode: 'ios',
      mode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
    })
  ],


  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    PersonPage,
    ChatPage,
    RegisterPage,
    AlarmPage,
    AlterinfoPage,
    AlterpwdPage
  ],
  providers: [
    StatusBar,
    Device,
    Geolocation,
    UserService,
    BackButtonService,
    Vibration,
    FileTransfer,
    SQLite,
    Media,
    Dialogs,
    FileUtil,
    File,
    DB,
    MediaCapture,
    ImagePicker,
    Camera,
    LocalNotifications,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
