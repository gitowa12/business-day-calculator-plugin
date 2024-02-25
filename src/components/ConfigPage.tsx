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
import Swal from "sweetalert2";
import { PrimaryButton } from "./Button/PrimaryButton";
import { SecondaryButton } from "./Button/SecondaryButton";

const beforeConfig = GetConfig();
const beforeAppId = beforeConfig.shift(); //先頭のappiIdだけ切り取る
// console.log("beforeAppId", beforeAppId);
console.log("beforeConfig", beforeConfig);

export const ConfigPage = () => {
  const [appId, setAppId] = useState(beforeAppId);
  const [rows, setRows] = useState<Row[]>(beforeConfig || [createRow()]);
  const [onEdit, setOnEdit] = useState<onEdit[]>([]);
  type onEdit = {
    id?: string;
  };
  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [rows, appId, onEdit]);
  // const handleBeforeUnload = (e: any) => {
  //   if (beforeAppId !== appId) {
  //     e.preventDefault();
  //     e.returnValue = ""; // この設定でブラウザはユーザーに確認ダイアログを表示します
  //     return;
  //   }
  //   if (beforeConfig.length !== rows.length) {
  //     e.preventDefault();
  //     e.returnValue = ""; // この設定でブラウザはユーザーに確認ダイアログを表示します。
  //     return;
  //   }
  //   for (let i = 0; i < beforeConfig.length; i++) {
  //     if (beforeConfig[i] !== rows[i]) {
  //       e.preventDefault();
  //       e.returnValue = ""; // この設定でブラウザはユーザーに確認ダイアログを表示します。
  //       return;
  //     }
  //   }
  //   if (onEdit.length > 0) {
  //     e.preventDefault();
  //     e.returnValue = ""; // この設定でブラウザはユーザーに確認ダイアログを表示します。
  //     return;
  //   }
  // };

  console.log("onEdit", onEdit);
  const handleRemoveRow = (id: string, index: number) => {
    setOnEditState(id, "delete");
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
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

  const setOnEditState = (id: string, type: string) => {
    let newData = [];
    if (type === "done" || type === "delete") {
      newData = onEdit.filter((el) => el !== id);
    } else if (type === "edit") {
      newData = [...onEdit, id];
    }
    setOnEdit(newData);
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
    if (onEdit.length > 0) {
      Swal.fire({
        title: "保存エラー",
        text: "編集中の項目があります。編集を完了してください。",
        icon: "error",
        showClass: {
          popup: "swal2-show",
          backdrop: "swal2-backdrop-show",
          icon: "",
        },
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    // 保存する設定情報を作成
    let obj = {};

    obj[`key0`] = JSON.stringify(appId);
    rows.forEach((el, index) => {
      obj[`key${index + 1}`] = JSON.stringify(el);
    });

    // kintoneの設定情報を保存するメソッドを呼び出す
    kintone.plugin.app.setConfig(obj);
    //検証用（前のページに自動で飛ばない）
    // kintone.plugin.app.setConfig(obj, () => {
    //   console.log("savedconfig", obj);
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-fit min-w-[980px] mb-4">
        <div className="flex items-center mb-2 py-2 px-2 w-fit">
          <p className="font-bold mr-2">祝祭日管理アプリのID : </p>
          <input
            id="srcAppId"
            className="w-16 border-2 rounded-lg px-1 py-0.5 mr-2 outline-blue-500"
            type="number"
            min={0}
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
        </div>
        <div className="mb-4 ml-10">
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
                    setOnEditState={setOnEditState}
                  ></InputList>
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div className="space-x-2">
        <PrimaryButton onClick={handleSave}>保存</PrimaryButton>
        <PrimaryButton color={"red"} onClick={() => history.back()}>
          キャンセル
        </PrimaryButton>
      </div>
    </form>
  );
};
