import { Component ,  ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Geolocation} from '@ionic-native/geolocation';
import { ToastController,ModalController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {FileUtil} from "../../service/FileUtil";
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
 * Generated class for the AlarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var baidumap_location;

@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage {

  listData:any;
  username:string='';
  interval:any;
  loader:any;
  local:string='';
  lo:any;
  al:any;
  newMsg:any;
  @ViewChild('content') content: Content;

  constructor(private mediaCapture:MediaCapture,private imagePicker:ImagePicker,private camera:Camera,public fileUtil:FileUtil,private file:File,private media:Media,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public http: Http, public geolocation: Geolocation,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.username = window.localStorage.getItem('username');


  }

  ionViewDidLoad() {

    this.loader = this.loadingCtrl.create({
        spinner: 'crescent',
        content: "载入中...",
    });
    this.loader.present();
  	this.interval=setInterval(() => {
         this.initData();

    }, 1000);

  	this.getLocation();

  }
  initData(){
  	this.http.request(window.localStorage.getItem('host')+'/message/nlist/'+window.localStorage.getItem('usercode'))
        .toPromise()
        .then(res =>{
            this.listData = res.json();
            if(this.listData.length>0){
              this.newMsg = this.listData[this.listData.length-1].message.message_code;
              console.log("newMsg="+this.newMsg);
            }else{
              this.newMsg='';
            }
            this.content.scrollToBottom(0);
            if(this.loader!=null) this.loader.dismiss();
        })
        .catch(err => { });
  }



  showMsg(info:string){
  	let alert1 = this.alertCtrl.create({
      title: '消息',
      subTitle: info,
      buttons: ['OK']
    });
    alert1.present();
  }
  //发送消息
  sendMsg(userinfo:HTMLInputElement){
  	if( userinfo.value == ''){
  		this.showMsg("消息不能为空！");
      return;
  	}

     let addr = window.localStorage.getItem('addr');
    // alert(addr);
     let lo =  window.localStorage.getItem('longitude');
     let la =  window.localStorage.getItem('latitude');

     //  let url =  'http://'+window.localStorage.getItem('host')+'/RestServer/message/add/'+window.localStorage.getItem('usercode')+'/'+'【 '+ rs.address+' ('+rs.surroundingPois[0].title+'：'+rs.surroundingPois[0].address+') 】'+userinfo.value+'/'+lo+'/'+la ;


      let url =  window.localStorage.getItem('host')+'/message/add/'+window.localStorage.getItem('usercode')+'/'+'【 '+ addr +' 】'+userinfo.value+'/'+lo+'/'+la ;

      this.http.request(url).toPromise().then(res =>{
           if(res.json().text =='1'){
             userinfo.value = '';
             this.presentToast('报警消息发送成功！');

           } else{
             this.presentToast("报警消息发送失败！");
           }
        }).catch(err => { this.presentToast(err);});

  }

  getLocation(){

      baidumap_location.getCurrentPosition(function (r) {
       // alert(JSON.stringify(r, null, 4));
        window.localStorage.setItem('addr',r.addr+'('+r.locationDescribe+')');
        window.localStorage.setItem('longitude',r.longitude);
        window.localStorage.setItem('latitude',r.latitude);
    }, function (error) {});
  }

  getInfo(code:any){
     if(code.value==''){
      return;
     }

     this.http.request(window.localStorage.getItem('host')+'/police/loadInfoById/'+code.value)
        .toPromise()
        .then(res =>{
           let wk = res.json();
          let confirm = this.alertCtrl.create({
              subTitle: '接警人信息',
              message: '姓名：'+wk.police.police_name+'<br/>'+'性别：'+wk.police.police_sex+'<br/>'+'手机：'+wk.police.police_phone+'<br/>'+'单位：'+wk.policeunit.policeunit_name,
              buttons: [
                {
                  text: '呼叫',
                  handler: () => {
                    console.log('Disagree clicked');
                    window.location.href = "tel:" + wk.police.police_phone;
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
        }).catch(err => { this.presentToast(err);});
  }


  presentToast(info) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }


  SetHeight(footer:any){

    if(footer.style.height == "190px"){

      footer.style.height = "50px";
       this.content.resize();
      return ;

    }
    this.content.resize();
    footer.style.height = "190px";

  }

  switch(iconswitch:any,words:any,sound:any){
    if(iconswitch.name=='keypad'){
      sound.style.display ="block";
      words.style.display ="none";
      iconswitch.name='mic';
    }else{
      sound.style.display="none";
      words.style.display="block";
      iconswitch.name='keypad';
    }
  }

  gosound(a_sw:any,b_sw:any,words:any,sound:any){
      sound.style.display="block";
      a_sw.style.display="none";
      words.style.display="none";
      b_sw.style.display="block";
  }
  gowrite(a_sw:any,b_sw:any,words:any,sound:any){

      sound.style.display="none";
      a_sw.style.display="block";
      words.style.display="block";
      b_sw.style.display="none";
  }



  /**
   * 选择照片
   */
  PhotoPick(){
    const options:ImagePickerOptions ={
      maximumImagesCount:5,
      quality:90,
      outputType :0
    };
    let imgs = new Array<string>();
    this.imagePicker.getPictures(options).then((results) => {
      let ucode = window.localStorage.getItem("usercode");
      let date = this.fileUtil.getRangeDate(-6);

      for (var i = 0; i < results.length; i++) {
        alert(results[i]);

        this.fileUtil.upload(results[i],ucode+date+"_"+i+".jpg");

        imgs.push(results[i]);
      }

    }, (err) => { });
  }



  /**
   * 拍照
   */
  takePhoto(){

    const options: CameraOptions = {
      quality: 70,                                                   //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
      // sourceType: this.camera.PictureSourceType.CAMERA ,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,

    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let filename = window.localStorage.getItem("usercode") +'_'+  this.fileUtil.getRangeDate(-6)+".jpg";
      this.fileUtil.upload(base64Image,window.localStorage.getItem("usercode")+this.fileUtil.getRangeDate(-6)+".jpg");
      this.fileUtil.add(window.localStorage.getItem("usercode"),this.newMsg,'1',filename);

    }, (err) => { });

  }


  /**
   * 视频拍摄
   */

  public videoUrl:any="";
  captureVideo() {
    var options = {limit: 1, duration: 120};

    this.mediaCapture.captureVideo(options).then((videoData)=> {


      alert(JSON.stringify(videoData, null, 4));

      //setInterval(sendVideo(),1000)

      let a = videoData[0];
      alert(JSON.stringify(a, null, 4));
      let ss = a.localURL;
      this.fileUtil.upload(ss, "VID" + window.localStorage.getItem("usercode") + "_" + a.name);


      /**
       * @return
       * [
       {
           "name": "VID_20161227_153633.mp4",
           "localURL": "cdvfile://localhost/persistent/DCIM/Camera/VID_20161227_153633.mp4",
           "type": "video/mp4",
           "lastModified": null,
           "lastModifiedDate": 1482824196000,
           "size": 5671730,
           "start": 0,
           "end": 0,
           "fullPath": "file:///storage/sdcard0/DCIM/Camera/VID_20161227_153633.mp4"
       }
       ]
       */
    },  (err)=> {
      // An error occurred. Show a message to the user
    });


  }




  /**
   * 录音
   * @type {number}
   */
  start:any = false;
  btnRecColor:string = "light";
  public btnRecText:string="按一下说话";
  Rec(){
    this.start = !this.start;
    if(this.start){
      this.recordSound();
    }else{
      this.recordClose();
    }

  }


  n:any = 0;
  intervalRec:any;
  ffile:any;
  ul:any;
  fileName:any;
  recordSound(){
    let date =  this.fileUtil.getRangeDate(-6);

    this.fileName = window.localStorage.getItem("usercode")+ date+".m4a";

     alert(this.file.externalApplicationStorageDirectory+this.fileName);
    this.file.createFile(this.file.externalApplicationStorageDirectory, this.fileName, true).then(() => {
      this.ul = this.file.externalApplicationStorageDirectory.replace(/^file:\/\//, '') + this.fileName;
      this.ffile = this.media.create(this.ul );
      this.ffile.startRecord();
      this.btnRecColor= "danger";
      this.n = 0;
      this.intervalRec=setInterval(() => {
        this.rec(this.ffile )
      }, 1000);
    });
  }


  rec(file){
    this.n++;
    //alert(this.n);
    this.btnRecText = "正在录音 "+ this.n+"秒";
    if(this.n>=60){
      this.recordClose();
      return;
    }
  }

  /**
   * 结束录音
   */
  recordClose(){
    this.ffile .stopRecord();

    this.fileUtil.upload(this.ul,this.fileName);
    this.start = false;
    clearInterval(this.intervalRec);
    this.btnRecText  = "语音发送成功！";
    setTimeout(()=>{
      this.btnRecColor= "light";
      this.btnRecText  = "按一下说话";
    },1000);
    return;

  }






  ionViewDidLeave(){

      clearInterval(this.interval);
  }

}




