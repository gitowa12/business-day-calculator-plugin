import "./index.css";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";

(function (PLUGIN_ID) {
  const holidayAppId = 416;
  let holidays = [];
  const user = kintone.getLoginUser().code;
  // 実行ユーザー
  const users = [
    "Administrator",
    "masuda.daichi@jp.panasonic.com",
    "hosoda.eriko@kk.jp.panasonic.com",
    "nakao.kaori001@kk.jp.panasonic.com",
    "towa.sunagawa@persol-pt.co.jp",
    "mineo.yoshikawa@persol-pt.co.jp",
  ];
  // レコード全件取得API
  const recordGetAll = async function (param, errmsg) {
    const client = new KintoneRestAPIClient();
    const params = {};
    if (param.app) {
      params.app = param.app;
    } else {
      errmsg.message.push("取得対象のアプリIDが設定されていません。");
      return false;
    }
    if (param.fields) {
      params.fields = param.fields;
    }
    if (param.condition) {
      params.condition = param.condition;
    }
    if (param.orderBy) {
      params.orderBy = param.orderBy;
    }
    if (param.withCursor) {
      params.withCursor = param.withCursor;
    }
    let resp = await client.record
      .getAllRecords(params)
      .catch(async function (err) {
        console.log(err);
        errmsg.message.push("レコードの取得に失敗しました。");
        return false;
      });
    if (resp) {
      return resp;
    } else {
      return false;
    }
  };
  // 祝祭日取得
  const getHoliday = async (errmsg) => {
    const param = {
      app: holidayAppId,
      fields: ["祝日"],
    };
    let resp = await recordGetAll(param).catch(async function (err) {
      console.log(err);
      errmsg.message.push("レコードの取得処理に失敗しました。");
      return false;
    });
    if (resp) {
      holidays = await resp.map(function (record) {
        return record.祝日.value;
      });
      console.log(holidays);
      return true;
    } else {
      return false;
    }
  };

  if (users.includes(user)) {
    kintone.events.on(
      ["app.record.create.show", "app.record.edit.show"],
      async function (event) {
        const errmsg = {
          message: [],
        };
        let resp = await getHoliday(errmsg).catch(async function (err) {
          console.log(err);
          errmsg.message.push("祝祭日取得処理に失敗しました。");
          return false;
        });
      }
    );
    const events = ["app.record.create.submit", "app.record.edit.submit"];
    kintone.events.on(events, async function (event) {
      const eventType = event.type;
      console.log(event);
      let record = event.record;
      console.log(record);
      console.log(event);
      /*if(hogehoge){
        let resp = window.confirm('hogehoge');
        if(!resp){
          return false;
        }
      }*/
      return event;
    });
  }
  //前回の設定を取得する関数

  //祝祭日カレンダーアプリから、祝祭日情報を取得する関数

  //営業日計算関数

  // kintone.events
})(kintone.$PLUGIN_ID);
