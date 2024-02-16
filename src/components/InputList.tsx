import React, { useRef, useState } from "react";

export const InputList = ({
  row,
  index,
  handleRemoveRow,
  updateParentState,
}) => {
  const [rowValue, setRowValue] = useState<Row>(row);
  type Row = {
    id: string;
    srcField: string;
    daysNum: number;
    selectBeforeAfter: string;
    destField: string;
  };
  const [isReadOnly, setIsReadOnly] = useState(true);
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
    } else if (id === "selectBeforeAfter") {
      const newRow = { ...rowValue, selectBeforeAfter: newValue };
      setRowValue(newRow);
      return;
    } else if (id === "destField") {
      const newRow = { ...rowValue, destField: newValue };
      setRowValue(newRow);
      return;
    }
  };

  const handleEdit = () => {
    setIsReadOnly(false); // readOnlyを解除
    // next tickでinput要素にフォーカスを設定
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  const handleSave = (index: number) => {
    updateParentState(index, rowValue);
    console.log("Saving changes...");
    setIsReadOnly(true); // 保存後、再度readOnlyをtrueに設定
  };

  return (
    <div key={row.id} className="flex items-center ">
      <div className="  border-2  border-gray-300 border-l-8 border-l-blue-500 rounded-lg px-4 py-2 mb-2 mr-2 flex items-end w-fit">
        <input
          id="srcField"
          ref={inputRef}
          className="w-36 border-2 rounded-lg px-1 py-0.5 mr-2 "
          type="text"
          value={rowValue.srcField}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          readOnly={isReadOnly}
        />
        <p className="mr-2">フィールドの</p>
        <input
          id="daysNum"
          type="number"
          className="w-16 border-2 rounded-lg px-1 py-0.5 mr-2"
          value={rowValue.daysNum}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          readOnly={isReadOnly}
        />
        <p className="mr-2">営業日</p>
        <select
          id="selectBeforeAfter"
          className="text-black w-16 border-2 rounded-lg px-1 py-0.5 mr-2 disabled:text-black"
          value={rowValue.selectBeforeAfter}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          disabled={isReadOnly}
        >
          <option value="before">前</option>
          <option value="after">後</option>
        </select>
        <p className="mr-2">の日付を</p>
        <input
          id="destField"
          className=" w-36 border-2 rounded-lg px-1 py-0.5 mr-2 "
          type="text"
          value={rowValue.destField}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
          readOnly={isReadOnly}
        />
        <p className="mr-2">に表示</p>
      </div>
      <div className="flex items-center  py-2 mb-2 ">
        {isReadOnly ? (
          <button
            type="button" // 同上
            className="border-2 border-yellow-600 rounded text-yellow-600 px-2 py-1 mr-2"
            onClick={handleEdit}
          >
            編集
          </button>
        ) : (
          <button
            type="button"
            className="border-2 border-green-600 rounded text-green-600 px-2 py-1 mr-2"
            onClick={() => {
              handleSave(index);
            }}
          >
            完了
          </button>
        )}
        <button
          type="button" // 同上
          className="border-2 border-red-700 rounded text-red-700 px-2 py-1"
          onClick={() => handleRemoveRow(index)}
        >
          削除
        </button>
      </div>
    </div>
  );
};
