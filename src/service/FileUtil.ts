import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export  class  FileUtil{
  fileTransfer:FileTransferObject;
  constructor(private http:Http,private transfer:FileTransfer){
    this.fileTransfer = this.transfer.create();
  }

  add(worker_code,message_code,file_type,file_url){

    let url = 'http://192.168.2.67:8088/RestServer/json/files/add/'+worker_code+'/'+message_code+'/'+file_type+'/'+file_url;
    console.log(url);
    this.http.request(url).toPromise().then((data)=>{
       let res = data.json();
       if(res.text==="1"){
          console.log("addok");
       }else{
         console.log("addfail");
       }
    }).catch((err)=>{
        console.log("error:"+err);
    })
  }






  upload(path,filename) {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: filename,   //文件名称
      headers: {},
      params: {
        maxSize: 50000000
      }
    };

    this.fileTransfer.upload(path, 'http://192.168.2.67:8088/RestServer/upload', options)

      .then((data) => {
        console.log("上传成功");
      }, (err) => {
        console.log(JSON.stringify(err,null,4));
      });
  }


  /**
   * 获取时间yyyyMMddHHmmss
   * @param {number} range
   * @param {string} type
   * @returns {string}
   */
  getRangeDate( range: number, type?: string ):string {

    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
      const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      const hour: any = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
      const min: any = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
      const sec: any = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
      return year + '' + month + '' + day+''+hour+''+min+''+sec;
    };

    const now = formatDate( new Date().getTime() ); // 当前时间
    const resultArr: Array<any> = [];
    let changeDate: string;
    if ( range ) {
      if( type ) {
          if ( type === 'one' ) {
          changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
          console.log( changeDate );
        }
        if ( type === 'more' ) {
          if ( range < 0 ) {
            for ( let i = Math.abs( range ); i >= 0; i-- ) {
              resultArr.push( formatDate( new Date().getTime() + ( -1000 * 3600 * 24 * i ) ) );
              console.log( resultArr );
            }
          } else {
            for ( let i = 1; i <= range; i++ ) {
              resultArr.push( formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * i ) ) );
              console.log( resultArr );
            }
          }

        }
      } else {
        changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
        console.log( changeDate );
      }
    }

    return changeDate;
  }




}
