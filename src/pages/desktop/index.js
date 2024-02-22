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

  // 指定された営業日数後の日付を計算する関数
  // 営業日とは、週末（土・日）および指定された祝日以外の日を指す
  const calcuBizDays = (startDate, daysNum, beforeOrAfter, holidays) => {
    let moveNumber = undefined;
    if (beforeOrAfter === "before") {
      moveNumber = -1;
    } else if (beforeOrAfter === "after") {
      moveNumber = 1;
    }
    let currentDate = new Date(startDate);
    let bizDaysCount = 0;

    // 指定された営業日数に達するまで日付を1日ずつ加算
    while (bizDaysCount < daysNum) {
      currentDate = addDays(currentDate, moveNumber); // 前の日に移動
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

      //フィールドの値変更イベントを作成
      const srcFieldArray = config.map((el) => el.srcField);
      console.log("srcFieldArray", srcFieldArray);
      let events = [];
      srcFieldArray.forEach((el) => {
        events.push(`app.record.edit.change.${el}`);
        events.push(`app.record.create.change.${el}`);
      });
      // console.log("events", events);

      //フィールドの値変更イベント
      kintone.events.on(events, (event) => {
        //イベント発火元のフィールドを抽出
        console.log("event", event);
        const eventFieldArray = event.type.split("change.");
        const eventField = eventFieldArray[1];
        console.log("eventField", eventField);

        //抽出したフィールド名を持つ設定行のみを抽出
        const targetConfig = config.find((el) => el.srcField === eventField);
        console.log("find", find);

        //設定行に未入力の項目があれば、処理を中断する
        if (
          targetConfig.srcField === "" ||
          targetConfig.daysNum === ("" || null) ||
          targetConfig.destField === ""
        ) {
          return;
        }

        //設定値をそれぞれ代入して営業日計算処理を実行
        const srcField = targetConfig.srcField;
        console.log("srcField", srcField);
        const daysNum = targetConfig.daysNum;
        const beforeOrAfter = targetConfig.beforeOrAfter;
        const destField = targetConfig.destField;
        console.log("desiField", destField);
        console.log("srcField.value", event.record[srcField].value);
        const startDate = checkDateFormat(event.record[srcField].value);
        console.log("startDate", startDate);
        const result = calcuBizDays(
          startDate,
          daysNum,
          beforeOrAfter,
          holidays
        );
        event.record[destField].value = result; //計算結果を結果表示先フィールドに設定する
        return event;
      });
    }
  );
})(kintone.$PLUGIN_ID);
