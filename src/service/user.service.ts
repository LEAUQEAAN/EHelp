import { Injectable } from '@angular/core';  
import {User} from "../viewmodel/user";
import {DB} from "./DB";

@Injectable() 
export class UserService{

 	db:DB;
	constructor(Db:DB) {
		this.db = Db;
	}

	getUserList(dept:string):any{
		this.db.initDatabase();
		let list = new Array<User>();  
		this.db.myAppDB.executeSql("select * from worker where scenic_code = ? ;",[window.localStorage.getItem('dept')]).then((data)=>{
	        //alert(JSON.stringify(data,null,4)); 
	        for (let i = 0 ; i < data.rows.length; i++) {
	            let  t = data.rows.item(i);
	            let u = new User();
	            u.scenic_code = t.scenic_code;
	            u.worker_code = t.worker_code;
	            u.worker_name = t.worker_name;
	            u.worker_phone = t.worker_phone;
	            u.worker_sex = t.worker_sex;
	            u.worker_serviceid = t.worker_serviceid;
	            list.push(u); 
	            //alert(JSON.stringify(u,null,4)); 
	        } 
	       // alert(JSON.stringify(list,null,4));  
	    },(error)=>{ 
	    }); 
	    //alert(JSON.stringify(list,null,4));  
	    return list; 
	} 
	
}


