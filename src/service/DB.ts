import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DB {

  myAppDB: SQLiteObject;

  constructor(private sqlite: SQLite) {
     
  }

  initDatabase() {
    this.sqlite.create({
       name: 'myApp.db',
       location: 'default'
    }).then((database: SQLiteObject) => {
      database.executeSql('CREATE TABLE IF NOT EXISTS worker(worker_code  VARCHAR2(20)  primary key,' +
        'scenic_code   VARCHAR2(30), ' +
        'worker_serviceid  VARCHAR2(100),'+
        'worker_name  VARCHAR2(40),'+
        'worker_sex  VARCHAR2(10),'+
        'worker_phone  VARCHAR2(18));'
      , {}).then(() => console.log('init database successfully')).catch(e => console.log(e));  

      this.myAppDB = database;
    });
  }  
}
