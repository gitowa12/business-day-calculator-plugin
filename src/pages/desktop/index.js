// import "./index.css";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import { GetConfig } from "../../services/GetConfig";

((PLUGIN_ID) => {
  const config = GetConfig();
  const appId = config.shift();
  console.log("config", config);
  const client = new KintoneRestAPIClient();

  const holidayAppParam = {
    app: appId,
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
      // console.log("holidays", holidays);
      return holidays;
    } catch (error) {
      console.log(error);
      console.log("レコードの取得に失敗しました。");
      return false;
    }
  };

  // 指定された日数を日付に加算する関数
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // 日付が週末であるかどうかをチェックする関数（土曜日または日曜日の場合はtrueを返す）
  const isWeekend = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 日曜日 = 0, 土曜日 = 6
  };

  // 日付が指定された祝日リストに含まれているかどうかをチェックする関数
  const isHoliday = (date, holidays) => {
    const formattedDate = date.toISOString().split("T")[0]; // 日付をYYYY-MM-DD形式に変換
    return holidays.includes(formattedDate); // 祝日リストに含まれているかチェック
  };

  // 営業日数前の日付を計算する関数
  // 営業日とは、週末（土・日）および指定された祝日以外の日を指す
  const calcuBizDaysBefore = (startDate, daysNum, holidays) => {
    let currentDate = new Date(startDate);
    console.log("currentDate", currentDate);
    console.log("numBizDayz", daysNum);
    let bizDaysCount = 0;
    // 指定された営業日数に達するまで日付を1日ずつ減算
    while (bizDaysCount < daysNum) {
      currentDate = addDays(currentDate, -1); // 前の日に移動
      // その日が営業日である場合（週末でも祝日でもない場合）、営業日カウントを増やす
      if (!isWeekend(currentDate) && !isHoliday(currentDate, holidays)) {
        bizDaysCount++;
      }
    }
    console.log("currentDate", currentDate);
    return currentDate.toISOString().split("T")[0]; // YYYY-MM-DD 形式で返す
  };

  // 指定された営業日数後の日付を計算する関数
  // 営業日とは、週末（土・日）および指定された祝日以外の日を指す
  const calcuBizDaysAfter = (startDate, daysNum, holidays) => {
    let currentDate = new Date(startDate);
    let bizDaysCount = 0;
    // 指定された営業日数に達するまで日付を1日ずつ加算
    while (bizDaysCount < daysNum) {
      currentDate = addDays(currentDate, 1); // 次の日に移動
      // その日が営業日である場合（週末でも祝日でもない場合）、営業日カウントを増やす
      if (!isWeekend(currentDate) && !isHoliday(currentDate, holidays)) {
        bizDaysCount++;
      }
    }
    // 計算後の日付をYYYY-MM-DD形式で返す
    return currentDate.toISOString().split("T")[0];
  };

  const checkDateFormat = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      // srcFieldがYYYY-MM-DD形式でない場合、Dateオブジェクトで解析し、YYYY-MM-DD形式に変換
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // 月は0から始まるため、+1する
      const day = ("0" + dateObj.getDate()).slice(-2);
      const result = `${year}-${month}-${day}`;
      // console.log("checkedDate", result); // YYYY-MM-DD形式の日付}
      return result;
    }
    // 変換後のsrcFieldを使用する
    // console.log("checkedDate", date); // YYYY-MM-DD形式の日付}
    return date;
  };

  // if (users.includes(user)) {}
  kintone.events.on(
    ["app.record.create.show", "app.record.edit.show"],
    async (event) => {
      const holidays = await getHoliday(holidayAppParam);
      console.log("holidays", holidays);
      //フィールドの値変更イベントを作成する。
      const srcFieldAllay = config.map((el) => el.srcField);
      console.log("srcFieldAllay", srcFieldAllay);
      let events = [];
      srcFieldAllay.forEach((el) => {
        events.push(`app.record.edit.change.${el}`);
        events.push(`app.record.create.change.${el}`);
      });
      // console.log("events", events);
      kintone.events.on(events, (event) => {
        // console.log("Hello,change");

        config.forEach((el, index) => {
          if (
            el.srcField === "" ||
            el.daysNum === ("" || null) ||
            el.destField === ""
          ) {
            return;
          }
          const srcField = el.srcField;
          // console.log("srcField", srcField);
          const daysNum = el.daysNum;
          const beforeOrAfter = el.beforeOrAfter;
          const destField = el.destField;
          // if (
          //   event.record[srcField].value === "" ||
          //   event.record[daysNum].value === (null || "") ||
          //   event.record[destField].value === ""
          // ) {
          //   return;
          // }
          const startDate = checkDateFormat(event.record[srcField].value);
          console.log("startDate", startDate);
          let result = "";
          if (beforeOrAfter === "before") {
            result = calcuBizDaysBefore(startDate, daysNum, holidays);
          } else if (beforeOrAfter === "after") {
            result = calcuBizDaysAfter(startDate, daysNum, holidays);
          }
          console.log("result", result);
          event.record[destField].value = result;
        });
        return event;
      });
    }
  );
})(kintone.$PLUGIN_ID);
