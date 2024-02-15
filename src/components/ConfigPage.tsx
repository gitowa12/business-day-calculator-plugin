import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AdditionInput } from "./AdditionInput";
import { InputList } from "./InputList";

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

export const ConfigPage = () => {
  const [rows, setRows] = useState<Row[]>([createRow()]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  type Row = {
    id: string;
    srcField: string;
    daysNum: number;
    selectBeforeAfter: string;
    destField: string;
  };

  const handleRemoveRow = (index: number) => {
    const newRows = [...rows];
    if (rows.length > 1) {
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // イベントオブジェクトを正しく参照
    // ここでフォーム送信時の処理を定義
  };

  const addParentState = (newValue: Row) => {
    // const newRow = createRow();
    setRows([newValue, ...rows]);
  };

  const updateParentState = (index: number, newValue: Row) => {
    const newRows = [...rows];
    newRows[index] = newValue;
    setRows(newRows);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdditionInput addParentState={addParentState}></AdditionInput>
      {rows.map((row, index, boor) => (
        <div key={row.id}>
          <InputList
            row={row}
            index={index}
            handleRemoveRow={handleRemoveRow}
            updateParentState={updateParentState}
          ></InputList>
          {/* <input
            className="border-2 rounded-lg px-4 py-2 mr-2 mb-2"
            type="text"
            value={row.value}
            onChange={(e) => handleChange(index, e)}
          />
          <button
            type="button" // 同上
            className="border-2 border-yellow-600 rounded text-yellow-600 px-4 py-2 mr-2"
            onClick={() => handleRemoveRow(index)}
          >
            Edit
          </button>
          <button
            type="button" // 同上
            className="border-2 border-red-700 rounded text-red-700 px-4 py-2"
            onClick={() => handleRemoveRow(index)}
          >
            Remove
          </button> */}
        </div>
      ))}
    </form>
  );
};
