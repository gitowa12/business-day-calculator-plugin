declare namespace kintone.types {
  interface Fields {
    日時_元: kintone.fieldTypes.DateTime;
    日付_先: kintone.fieldTypes.Date;
    日時_元_0: kintone.fieldTypes.Date;
    日付_元: kintone.fieldTypes.Date;
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
