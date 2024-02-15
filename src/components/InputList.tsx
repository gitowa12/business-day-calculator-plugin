import React, { useRef, useState } from "react";

export const InputList = ({
  row,
  index,
  handleRemoveRow,
  updateParentState,
}) => {
  const [inputValue, setInputVlue] = useState(row.value);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const inputRef = useRef(null);

  const handleChange = (newValue: string) => {
    setInputVlue(newValue);
  };

  const handleEdit = () => {
    setIsReadOnly(false); // readOnlyを解除
    // next tickでinput要素にフォーカスを設定
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  const handleSave = (index: number, newValue: string) => {
    updateParentState(index, newValue);
    console.log("Saving changes...");
    setIsReadOnly(true); // 保存後、再度readOnlyをtrueに設定
  };

  return (
    <div
      key={row.id}
      className=" inline-block border-2  border-gray-300 border-l-8 border-l-blue-500 rounded-lg px-4 py-2 "
    >
      <input
        ref={inputRef}
        className="border-2 rounded-lg px-4 py-2 mr-2 "
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        readOnly={isReadOnly}
      />
      {isReadOnly ? (
        <button
          type="button" // 同上
          className="border-2 border-yellow-600 rounded text-yellow-600 px-4 py-2 mr-2"
          onClick={handleEdit}
        >
          Edit
        </button>
      ) : (
        <button
          type="button"
          className="border-2 border-green-600 rounded text-green-600 px-4 py-2 mr-2"
          onClick={() => {
            handleSave(index, inputValue);
          }}
        >
          Save
        </button>
      )}

      <button
        type="button" // 同上
        className="border-2 border-red-700 rounded text-red-700 px-4 py-2"
        onClick={() => handleRemoveRow(index)}
      >
        Remove
      </button>
    </div>
  );
};
