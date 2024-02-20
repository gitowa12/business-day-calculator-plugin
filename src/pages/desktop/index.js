// import "./index.css";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import { GetConfig } from "../../services/GetConfig";

((PLUGIN_ID) => {
  const PLUGIN_ID = kintone.$PLUGIN_ID;
  console.log("PLUGIN_ID", PLUGIN_ID);
  const client = new KintoneRestAPIClient();

  const holidayAppParam = {
    app: 9,
    fields: ["祝日"],
  };

  // // 実行ユーザー指定
  // const user = kintone.getLoginUser().code;
  // const users = ["Administrator", "towadev12@gmail.com"];

  // 祝祭日取得
  const getHoliday = async (param) => {
    try {
      const resp = await client.record.getAllRecords(param);
      const holidays = resp.map((record) => {
        return record.祝日.value;
      });
      console.log("holidays", holidays);
      return holidays;
    } catch (error) {
      console.log(error);
      console.log("レコードの取得に失敗しました。");
      return false;
    }
  };

  // if (users.includes(user)) {}
  kintone.events.on(
    ["app.record.create.show", "app.record.edit.show"],
    async (event) => {
      const holidays = getHoliday(holidayAppParam);
      const config = GetConfig();
      console.log("config", config);
      kintone.events.on(
        ["app.record.create.submit", "app.record.edit.submit"],
        async (event) => {
          return event;
        }
      );
      return event;
    }
  );
})(kintone.$PLUGIN_ID);
