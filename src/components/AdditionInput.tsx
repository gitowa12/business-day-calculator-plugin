import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const createRow = () => {
  const newRow = {
    id: uuidv4(),
    srcField: "",
    daysNum: null,
    selectBeforeAfter: "",
    destField: "",
  };
  return newRow;
};

export const AdditionInput = ({ addParentState }) => {
  const [addRowValue, setAddRowValue] = useState<Row>(createRow()); // 変数名をキャメルケースに修正
  type Row = {
    id: string;
    srcField: string;
    daysNum: number;
    selectBeforeAfter: string;
    destField: string;
  };
  console.log(addRowValue);
  const handleChange = (id: string, newValue: any) => {
    if (id === "srcField") {
      const newRow = { ...addRowValue, srcField: newValue };
      console.log("newRow", newRow);
      setAddRowValue(newRow);
      return;
    } else if (id === "daysNum") {
      const newRow = { ...addRowValue, daysNum: newValue };
      setAddRowValue(newRow);
      return;
    } else if (id === "selectBeforeAfter") {
      const newRow = { ...addRowValue, selectBeforeAfter: newValue };
      setAddRowValue(newRow);
      return;
    } else if (id === "destField") {
      const newRow = { ...addRowValue, destField: newValue };
      setAddRowValue(newRow);
      return;
    }
  };

  const handleAddRow = (newValue: Row) => {
    addParentState(newValue);
    setAddRowValue(createRow()); // 追加後は入力フィールドをクリア
  };

  return (
    <div className="  border-2  border-gray-300 border-l-8 border-l-blue-500 rounded-lg px-4 py-2 flex items-end w-fit min-w-[950px]">
      <input
        id="srcField"
        // ref={inputRef}
        className="w-36 border-2 rounded-lg px-1 py-0.5 mr-2 "
        type="text"
        value={addRowValue.srcField}
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <p className="mr-2">フィールドの</p>
      <input
        id="daysNum"
        type="number"
        className="w-16 border-2 rounded-lg px-1 py-0.5 mr-2"
        value={addRowValue.daysNum}
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <p className="mr-2">営業日</p>
      <select
        id="selectBeforeAfter"
        className="text-black w-16 border-2 rounded-lg px-1 py-0.5 mr-2 disabled:text-black"
        value={addRowValue.selectBeforeAfter}
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      >
        <option value="before">前</option>
        <option value="after">後</option>
      </select>
      <p className="mr-2">の日付を</p>
      <input
        id="destField"
        className=" w-36 border-2 rounded-lg px-1 py-0.5 mr-2 "
        type="text"
        value={addRowValue.destField}
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <p className="mr-2">に表示</p>
      <button
        type="button" // フォームの送信を防ぐために type="button" を明示的に指定
        className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 mr-2"
        onClick={() => handleAddRow(addRowValue)}
      >
        Add
      </button>
    </div>
  );
};
