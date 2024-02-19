import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AdditionInput } from "./AdditionInput";
import { InputList } from "./InputList";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GetConfig } from "../services/GetConfig";
import { createRow } from "../Utilities/CreateRow";
import { Row } from "../types/types";

const config = GetConfig();

export const ConfigPage = () => {
  const [rows, setRows] = useState<Row[]>(config || [createRow()]);

  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

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

  const handleDragEnd = (e: { active: any; over: any }) => {
    const { active, over } = e;
    console.log("dragEndEvent", e);
    console.log("rows00", rows);

    if (active.id !== over.id) {
      // const oldIndex = rows.indexOf(active.id);
      const fromIndex = rows.findIndex((row) => row.id === active.id);
      console.log("fromIndex", fromIndex);
      // const newIndex = rows.indexOf(over.id);
      const toIndex = rows.findIndex((row) => row.id === over.id);
      console.log("toIndex", toIndex);
      const newRows = arrayMove(rows, fromIndex, toIndex);
      console.log("newRows", newRows);
      setRows(newRows);
    }
  };

  const handleSave = () => {
    // 保存する設定情報を作成
    let config = {};
    rows.forEach((el, index) => {
      config[`key${index}`] = JSON.stringify(el);
    });

    // kintoneの設定情報を保存するメソッドを呼び出す
    kintone.plugin.app.setConfig(config);
    //検証用（前のページに自動で飛ばない）
    // kintone.plugin.app.setConfig(config, () => {
    //   console.log(config);
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-fit min-w-[980px] mb-4">
        <div className="mb-4">
          <AdditionInput addParentState={addParentState}></AdditionInput>
        </div>
        <hr className="border-4 rounded-lg mb-4  " />
        <div>
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={rows}
              strategy={verticalListSortingStrategy}
            >
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
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div>
        <button
          type="submit" // 同上
          className="text-white rounded px-3 py-2  border-2 border-blue-600 bg-blue-600 hover:bg-blue-500 hover:border-blue-500 mr-2"
          onClick={handleSave}
        >
          保存
        </button>
        <button
          type="button" // 同上
          className="border-2 border-red-700 rounded text-red-700 px-3 py-2 "
          // onClick={}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};
