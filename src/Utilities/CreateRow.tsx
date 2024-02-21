// utils.ts
import { v4 as uuidv4 } from "uuid";
import { Row } from "../types/types"; // 型定義をインポート

export const createRow = (): Row => {
  const newRow: Row = {
    id: uuidv4(),
    srcField: "",
    daysNum: "",
    beforeOrAfter: "before",
    destField: "",
  };
  return newRow;
};
