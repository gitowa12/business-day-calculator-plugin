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
      <div className="w-fit min-w-[900px]">
        <div className="mb-4">
          <AdditionInput addParentState={addParentState}></AdditionInput>
        </div>
        <hr className="border-4 rounded-lg mb-4  " />
        <div>
          {rows.map((row, index) => (
            <div key={row.id}>
              <InputList
                row={row}
                index={index}
                handleRemoveRow={handleRemoveRow}
                updateParentState={updateParentState}
              ></InputList>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
