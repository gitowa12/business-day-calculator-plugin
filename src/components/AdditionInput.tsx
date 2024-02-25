import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createRow } from "../Utilities/CreateRow";
import { Row } from "../types/types";

export const AdditionInput = ({ addParentState }) => {
  const [addRowValue, setAddRowValue] = useState<Row>(createRow());

  const handleChange = (id: string, newValue: any) => {
    if (id === "srcField") {
      const newRow = { ...addRowValue, srcField: newValue };
      setAddRowValue(newRow);
      return;
    } else if (id === "daysNum") {
      const newRow = { ...addRowValue, daysNum: newValue };
      setAddRowValue(newRow);
      return;
    } else if (id === "beforeOrAfter") {
      const newRow = { ...addRowValue, beforeOrAfter: newValue };
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
    <div id={addRowValue.id} className="flex items-center">
      <div className="  h-14 border-2  border-gray-300 border-l-8 border-l-blue-500 rounded-lg px-4 py-2 mr-2 flex items-center  w-fit ">
        <input
          id="srcField"
          // ref={inputRef}
          className="w-36 border-2 rounded-lg px-1 py-0.5 mr-2 outline-blue-500"
          type="text"
          value={addRowValue.srcField}
          placeholder="FieldCode"
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <p className="mr-2">フィールドの</p>
        <input
          id="daysNum"
          type="number"
          className="w-16 border-2 rounded-lg px-1 py-0.5 mr-2 outline-blue-500"
          value={addRowValue.daysNum}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <p className="mr-2">営業日</p>
        <select
          id="beforeOrAfter"
          className="text-black w-16 border-2 rounded-lg px-1 py-0.5 mr-2 disabled:text-black outline-blue-500"
          value={addRowValue.beforeOrAfter}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        >
          <option value="before">前</option>
          <option value="after">後</option>
        </select>
        <p className="mr-2">の日付を</p>

        <input
          id="destField"
          className=" w-36 border-2 rounded-lg px-1 py-0.5 mr-2 outline-blue-500"
          type="text"
          placeholder="FieldCode"
          value={addRowValue.destField}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <p className="mr-2">に表示</p>
      </div>
      <div className="py-2  ">
        <button
          type="button" // フォームの送信を防ぐために type="button" を明示的に指定
          className="text-white rounded px-3 py-2  border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700"
          onClick={() => handleAddRow(addRowValue)}
        >
          追加
        </button>
      </div>
    </div>
  );
};
