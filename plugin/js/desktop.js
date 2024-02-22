/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services/GetConfig.tsx":
/*!************************************!*\
  !*** ./src/services/GetConfig.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GetConfig: () => (/* binding */ GetConfig)\n/* harmony export */ });\nvar GetConfig = function GetConfig() {\n  // 前回の設定の取得とデータの整形\n  // console.log(kintone.$PLUGIN_ID);\n  var PLUGIN_ID = kintone.$PLUGIN_ID;\n  // console.log(\"PLUGIN_ID\", PLUGIN_ID);\n  var getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);\n  // console.log(\"加工前データ\", getConfig);\n  var keysArray = Object.keys(getConfig);\n  // console.log(keysArray);\n  //keyの順番を昇順に並び替え\n  keysArray.sort(function (a, b) {\n    var numA = parseInt(a.replace(\"key\", \"\"));\n    var numB = parseInt(b.replace(\"key\", \"\"));\n    return numA - numB;\n  });\n  // console.log(keysArray);\n  var obj = {}; // config を最初に初期化\n  keysArray.forEach(function (key) {\n    obj[key] = JSON.parse(getConfig[key]); // configオブジェクトに挿入\n  });\n  // console.log(\"config(オブジェクト)\", config);\n  var config = Object.values(obj); //configオブジェクトを配列化\n  // console.log(\"config(配列)\", configArray);\n  return config;\n};\n\n//# sourceURL=webpack://business-day-calculator-plugin/./src/services/GetConfig.tsx?");

/***/ }),

/***/ "./src/pages/desktop/index.js":
/*!************************************!*\
  !*** ./src/pages/desktop/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@kintone/rest-api-client'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _services_GetConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/GetConfig */ \"./src/services/GetConfig.tsx\");\n// import \"./index.css\";\r\n\r\n\r\n\r\n((PLUGIN_ID) => {\r\n  const config = (0,_services_GetConfig__WEBPACK_IMPORTED_MODULE_1__.GetConfig)();\r\n  const appId = config.shift();\r\n  console.log(\"config\", config);\r\n  const client = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@kintone/rest-api-client'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n\r\n  const holidayAppParam = {\r\n    app: appId,\r\n    fields: [\"祝日\"],\r\n  };\r\n\r\n  // 祝祭日取得\r\n  const getHoliday = async (param) => {\r\n    try {\r\n      const resp = await client.record.getAllRecords(param);\r\n      const holidays = resp.map((record) => {\r\n        return record.祝日.value;\r\n      });\r\n      // console.log(\"holidays\", holidays);\r\n      return holidays;\r\n    } catch (error) {\r\n      console.log(error);\r\n      console.log(\"レコードの取得に失敗しました。\");\r\n      return false;\r\n    }\r\n  };\r\n\r\n  // 指定された日数を日付に加算する関数\r\n  const addDays = (date, days) => {\r\n    const result = new Date(date);\r\n    result.setDate(result.getDate() + days);\r\n    return result;\r\n  };\r\n\r\n  // 日付が週末であるかどうかをチェックする関数（土曜日または日曜日の場合はtrueを返す）\r\n  const isWeekend = (date) => {\r\n    const dayOfWeek = date.getDay();\r\n    return dayOfWeek === 0 || dayOfWeek === 6; // 日曜日 = 0, 土曜日 = 6\r\n  };\r\n\r\n  // 日付が指定された祝日リストに含まれているかどうかをチェックする関数\r\n  const isHoliday = (date, holidays) => {\r\n    const formattedDate = date.toISOString().split(\"T\")[0]; // 日付をYYYY-MM-DD形式に変換\r\n    return holidays.includes(formattedDate); // 祝日リストに含まれているかチェック\r\n  };\r\n\r\n  // 指定された営業日数後の日付を計算する関数\r\n  // 営業日とは、週末（土・日）および指定された祝日以外の日を指す\r\n  const calcuBizDays = (startDate, daysNum, beforeOrAfter, holidays) => {\r\n    let moveNumber = undefined;\r\n    if (beforeOrAfter === \"before\") {\r\n      moveNumber = -1;\r\n    } else if (beforeOrAfter === \"after\") {\r\n      moveNumber = 1;\r\n    }\r\n    let currentDate = new Date(startDate);\r\n    let bizDaysCount = 0;\r\n\r\n    // 指定された営業日数に達するまで日付を1日ずつ加算\r\n    while (bizDaysCount < daysNum) {\r\n      currentDate = addDays(currentDate, moveNumber); // 前の日に移動\r\n      // その日が営業日である場合（週末でも祝日でもない場合）、営業日カウントを増やす\r\n      if (!isWeekend(currentDate) && !isHoliday(currentDate, holidays)) {\r\n        bizDaysCount++;\r\n      }\r\n    }\r\n\r\n    // 計算後の日付をYYYY-MM-DD形式で返す\r\n    return currentDate.toISOString().split(\"T\")[0];\r\n  };\r\n\r\n  const checkDateFormat = (date) => {\r\n    const regex = /^\\d{4}-\\d{2}-\\d{2}$/;\r\n    if (!regex.test(date)) {\r\n      // srcFieldがYYYY-MM-DD形式でない場合、Dateオブジェクトで解析し、YYYY-MM-DD形式に変換\r\n      const dateObj = new Date(date);\r\n      const year = dateObj.getFullYear();\r\n      const month = (\"0\" + (dateObj.getMonth() + 1)).slice(-2); // 月は0から始まるため、+1する\r\n      const day = (\"0\" + dateObj.getDate()).slice(-2);\r\n      const result = `${year}-${month}-${day}`;\r\n      // console.log(\"checkedDate\", result); // YYYY-MM-DD形式の日付}\r\n      return result;\r\n    }\r\n    // 変換後のsrcFieldを使用する\r\n    // console.log(\"checkedDate\", date); // YYYY-MM-DD形式の日付}\r\n    return date;\r\n  };\r\n\r\n  // if (users.includes(user)) {}\r\n  kintone.events.on(\r\n    [\"app.record.create.show\", \"app.record.edit.show\"],\r\n    async (event) => {\r\n      //祝日情報を取得\r\n      const holidays = await getHoliday(holidayAppParam);\r\n      console.log(\"holidays\", holidays);\r\n\r\n      //フィールドの値変更イベントを作成\r\n      const srcFieldArray = config.map((el) => el.srcField);\r\n      console.log(\"srcFieldArray\", srcFieldArray);\r\n      let events = [];\r\n      srcFieldArray.forEach((el) => {\r\n        events.push(`app.record.edit.change.${el}`);\r\n        events.push(`app.record.create.change.${el}`);\r\n      });\r\n      // console.log(\"events\", events);\r\n\r\n      //フィールドの値変更イベント\r\n      kintone.events.on(events, (event) => {\r\n        //イベント発火元のフィールドを抽出\r\n        console.log(\"event\", event);\r\n        const eventFieldArray = event.type.split(\"change.\");\r\n        const eventField = eventFieldArray[1];\r\n        console.log(\"eventField\", eventField);\r\n\r\n        //抽出したフィールド名を持つ設定行のみを抽出\r\n        const targetConfig = config.find((el) => el.srcField === eventField);\r\n        console.log(\"find\", find);\r\n\r\n        //設定行に未入力の項目があれば、処理を中断する\r\n        if (\r\n          targetConfig.srcField === \"\" ||\r\n          targetConfig.daysNum === ( false || null) ||\r\n          targetConfig.destField === \"\"\r\n        ) {\r\n          return;\r\n        }\r\n\r\n        //設定値をそれぞれ代入して営業日計算処理を実行\r\n        const srcField = targetConfig.srcField;\r\n        console.log(\"srcField\", srcField);\r\n        const daysNum = targetConfig.daysNum;\r\n        const beforeOrAfter = targetConfig.beforeOrAfter;\r\n        const destField = targetConfig.destField;\r\n        console.log(\"desiField\", destField);\r\n        console.log(\"srcField.value\", event.record[srcField].value);\r\n        const startDate = checkDateFormat(event.record[srcField].value);\r\n        console.log(\"startDate\", startDate);\r\n        const result = calcuBizDays(\r\n          startDate,\r\n          daysNum,\r\n          beforeOrAfter,\r\n          holidays\r\n        );\r\n        event.record[destField].value = result; //計算結果を結果表示先フィールドに設定する\r\n        return event;\r\n      });\r\n    }\r\n  );\r\n})(kintone.$PLUGIN_ID);\r\n\n\n//# sourceURL=webpack://business-day-calculator-plugin/./src/pages/desktop/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/desktop/index.js");
/******/ 	
/******/ })()
;