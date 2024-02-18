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
    console.log("rows", rows);
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-fit min-w-[980px]">
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
    </form>
  );
};
