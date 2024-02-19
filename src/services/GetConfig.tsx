export const GetConfig = (): any => {
  // 前回の設定の取得とデータの整形
  // console.log(kintone.$PLUGIN_ID);
  const PLUGIN_ID = kintone.$PLUGIN_ID;
  const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
  // console.log("生データ", getConfig);

  const keysArray = Object.keys(getConfig);
  // console.log(keysArray);
  //keyの順番を昇順に並び替え
  keysArray.sort((a, b) => {
    const numA = parseInt(a.replace("key", ""));
    const numB = parseInt(b.replace("key", ""));
    return numA - numB;
  });
  // console.log(keysArray);

  let obj = {}; // config を最初に初期化
  keysArray.forEach((key) => {
    obj[key] = JSON.parse(getConfig[key]); // configオブジェクトに挿入
  });
  // console.log("config(オブジェクト)", config);

  const config = Object.values(obj); //configオブジェクトを配列化
  // console.log("config(配列)", configArray);
  return config;
};
