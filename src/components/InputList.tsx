import { useSortable } from "@dnd-kit/sortable";
import React, { useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Row } from "../types/types";

export const InputList = ({
  row,
  index,
  handleRemoveRow,
  updateParentState,
}) => {
  //dnd-kit
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [rowValue, setRowValue] = useState<Row>(row);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef(null);

  const handleChange = (id: string, newValue: any) => {
    if (id === "srcField") {
      const newRow = { ...rowValue, srcField: newValue };
      setRowValue(newRow);
      return;
    } else if (id === "daysNum") {
      const newRow = { ...rowValue, daysNum: newValue };
      setRowValue(newRow);
      return;
    } else if (id === "beforeOrAfter") {
      const newRow = { ...rowValue, beforeOrAfter: newValue };
      setRowValue(newRow);
      return;
    } else if (id === "destField") {
      const newRow = { ...rowValue, destField: newValue };
      setRowValue(newRow);
      return;
    }
  };

  const handleEdit = () => {
    setIsDisabled(false); // Disabledを解除
    // next tickでinput要素にフォーカスを設定
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  const handleSave = (index: number) => {
    updateParentState(index, rowValue);
    setIsDisabled(true); // 保存後、再度Disabledをtrueに設定
  };

  return (
    <div
      key={row.id}
      ref={setNodeRef}
      style={style}
      className="flex items-center mb-2"
    >
      {/* <div
        className="w-6 h-14 bg-blue-500  rounded-l-lg mb-2 "
        {...attributes}
        {...listeners}
      ></div> */}
      <RxDragHandleDots2
        className="size-10 focus:outline-none"
        {...attributes}
        {...listeners}
      />
      <div className="h-14 border-2  border-gray-300 border-l-8 border-l-blue-500 rounded-lg px-4 py-2 mr-2 flex items-center w-fit">
        <input
          id="srcField"
          ref={inputRef}
          className="w-36 border-2 rounded-lg px-1 py-0.5 mr-2 outline-blue-500"
          type="text"
          placeholder="FieldCode"
          value={rowValue.srcField}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          disabled={isDisabled}
        />
        <p className="mr-2">フィールドの</p>
        <input
          id="daysNum"
          type="number"
          className="w-16 border-2 rounded-lg px-1 py-0.5 mr-2 outline-blue-500"
          value={rowValue.daysNum}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          disabled={isDisabled}
        />
        <p className="mr-2">営業日</p>
        <select
          id="beforeOrAfter"
          className="text-black w-16 border-2 rounded-lg px-1 py-0.5 mr-2 disabled:text-black outline-blue-500"
          value={rowValue.beforeOrAfter}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          disabled={isDisabled}
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
          value={rowValue.destField}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          disabled={isDisabled}
        />
        <p className="mr-2">に表示</p>
      </div>
      <div className="flex items-center py-2">
        {isDisabled ? (
          <button
            type="button" // 同上
            className=" border-2 border-yellow-600 rounded text-yellow-600 px-3 py-2  mr-2 outline-blue-500"
            onClick={handleEdit}
          >
            編集
          </button>
        ) : (
          <button
            type="button"
            className="border-2 border-green-600 rounded text-green-600 px-3 py-2  mr-2"
            onClick={() => {
              handleSave(index);
            }}
          >
            完了
          </button>
        )}
        <button
          type="button" // 同上
          className="border-2 border-red-700 rounded text-red-700 px-3 py-2 "
          onClick={() => handleRemoveRow(index)}
        >
          削除
        </button>
      </div>
    </div>
  );
};
