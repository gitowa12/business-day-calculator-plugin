import React, { useState } from "react";

export const AdditionInput = ({ addParentState }) => {
  const [addValue, setAddValue] = useState(""); // 変数名をキャメルケースに修正

  const handleAddChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAddValue(e.target.value);
  };

  const handleAddRow = (newValue: string) => {
    addParentState(newValue);
    setAddValue(""); // 追加後は入力フィールドをクリア
  };

  return (
    <div>
      <input
        className="border-2 rounded-lg px-4 py-2 mr-2 mb-2"
        type="text"
        value={addValue}
        onChange={handleAddChange}
      />
      <button
        type="button" // フォームの送信を防ぐために type="button" を明示的に指定
        className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 mr-2"
        onClick={() => handleAddRow(addValue)}
      >
        Add
      </button>
    </div>
  );
};
