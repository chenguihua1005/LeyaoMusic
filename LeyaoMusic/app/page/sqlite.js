import React,{Component} from 'react';  
// import{  
//   ToastAndroid,  
// } from 'react-native'; 
import SQLiteStorage from 'react-native-sqlite-storage';  
SQLiteStorage.DEBUG(true);  
var database_name = "event.db";//数据库文件  
var database_version = "1.0";//版本号  
var database_displayname = "MySQLite";  
var database_size = -1;//-1应该是表示无限制  
var db; 
const Product_TABLE_NAME = "t_event_page";//表名称

export default class SQLite extends Component{  
  componentWillUnmount(){  
    if(db){  
        this._successCB('close');  
        db.close();  
    }else {  
        console.log("SQLiteStorage not open");  
    }  
  } 

  open(){  
    db = SQLiteStorage.openDatabase(  
      database_name,  
      database_version,  
      database_displayname,  
      database_size,  
      ()=>{  
          this._successCB('open');  
      },  
      (err)=>{  
          this._errorCB('open',err);  
      });  
    return db;  
  } 

  createTable(){  
    if (!db) {  
        this.open();  
    }  
    //创建用户表  
    db.transaction((tx)=> {  
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + Product_TABLE_NAME + '(' +  
          'h_event_id UNSIGNED BIGINT PRIMARY KEY NOT NULL,' +
          's_event_category_cd INTEGER NOT NULL,' +
          'r_event_category_desc VARCHAR(500) NOT NULL,' +
          's_event_type_cd INTEGER NOT NULL,' +
          'r_event_type_desc VARCHAR(500) NOT NULL,' +
          's_event_title_url VARCHAR(255) NOT NULL,' +
          's_event_content_url VARCHAR(255) NOT NULL,' +
          's_event_sub_content_1_url VARCHAR(255) NOT NULL,' +
          's_event_search_content_txt TEXT NOT NULL,' +
          's_event_active_ind INTEGER NOT NULL,' +
          'create_ts TIMESTAMP NOT NULL,' +
          'update_ts TIMESTAMP NOT NULL'
          + ')'  
          , [], ()=> {  
              this._successCB('executeSql');  
          }, (err)=> {  
              this._errorCB('executeSql', err);  
        });  
    }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。  
        this._errorCB('transaction', err);  
    }, ()=> {  
        this._successCB('transaction');  
    })  
  } 

  deleteData(){  
    if (!db) {  
        this.open();  
    }  
    db.transaction((tx)=>{  
      tx.executeSql('delete from ' + Product_TABLE_NAME,[],()=>{  
  
      });  
    });  
  }

  dropTable(){  
    db.transaction((tx)=>{  
      tx.executeSql('drop table ' + Product_TABLE_NAME,[],()=>{  
  
      });  
    },(err)=>{  
      this._errorCB('transaction', err);  
    },()=>{  
      this._successCB('transaction');  
    });  
  }

  insertUserData(eventData){  
    let len = eventData.length;  
    if (!db) {  
        this.open();  
    }  
    this.createTable();  
    this.deleteData();  
    db.transaction((tx)=>{  
       for(let i=0; i<len; i++){  
        var event = eventData[i];  
        //
        let hEventId= event.hEventId;  
        let rEventCategoryDesc = event.rEventCategoryDesc;  
        let rEventTypeDesc = event.rEventTypeDesc;  
        let sEventActiveInd = event.sEventActiveInd;  
        let sEventCategoryCd = event.sEventCategoryCd;  
        let sEventContentUrl = event.sEventContentUrl;  
        let sEventSearchContentTxt = event.sEventSearchContentTxt;  
        let sEventSubContent1Url = event.sEventSubContent1Url; 
        let sEventTitleUrl = event.sEventTitleUrl; 
        let sEventTypeCd = event.sEventTypeCd; 
        let createTs = event.createTs;  
        let updateTs = event.updateTs; 
        let sql = 'INSERT INTO ' + Product_TABLE_NAME + 
            '(h_event_id,s_event_category_cd,r_event_category_desc,s_event_type_cd,r_event_type_desc,' +
            's_event_title_url,s_event_content_url,s_event_sub_content_1_url,s_event_search_content_txt,s_event_active_ind,create_ts,update_ts)'+  
            'values(?,?,?,?,?,?,?,?,?,?,?,?)';  
        tx.executeSql(sql,[hEventId,rEventCategoryDesc,rEventTypeDesc,sEventActiveInd,sEventCategoryCd,sEventContentUrl,
          sEventSearchContentTxt,sEventSubContent1Url,sEventTitleUrl,sEventTypeCd,createTs,updateTs],()=>{  
            
          },(err)=>{  
            console.log(err);  
          }  
        );  
      }  
    },(error)=>{  
      this._errorCB('transaction', error);  
      //ToastAndroid.show("数据插入失败",ToastAndroid.SHORT);  
    },()=>{  
      this._successCB('transaction insert data');  
      //ToastAndroid.show("成功插入 "+len+" 条用户数据",ToastAndroid.SHORT);  
    });  
  }

  close(){  
      if(db){  
          this._successCB('close');  
          db.close();  
      }else {  
          console.log("SQLiteStorage not open");  
      }  
      db = null;  
  }

  _successCB(name){  
    console.log("SQLiteStorage "+name+" success");  
  }

  _errorCB(name, err){  
    console.log("SQLiteStorage "+name);  
    console.log(err);  
  }

  render(){  
        return null;  
  }  
};  