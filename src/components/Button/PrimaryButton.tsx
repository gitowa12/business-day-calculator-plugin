import React, { Children } from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode; // Reactノード
  color?: "blue" | "red" | "yellow" | "green" | "gray" | "gradient"; // カラーオプション
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // サイズオプション
  onClick?: () => void; // クリック時のハンドラー関数
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  color = "blue",
  size = "md",
  onClick,
}) => {
  // サイズに応じたクラス
  const sizeClasses = {
    xs: "text-xs py-1 px-2",
    sm: "text-sm py-2 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-2 px-5",
    xl: "text-xl py-3 px-6",
  };

  // カラーに応じたクラス グラデーションしているよ
  const colorClasses = {
    blue: "bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-800 hover:to-blue-700 text-white",
    red: "bg-gradient-to-t from-red-600 to-red-500 hover:from-red-800 hover:to-red-700 text-white",
    yellow:
      "bg-gradient-to-t from-yellow-600 to-yellow-500 hover:from-yellow-800 hover:to-yellow-700 text-white",
    green:
      "bg-gradient-to-t from-green-600 to-green-500 hover:from-green-800 hover:to-green-700 text-white",
    gray: "bg-gradient-to-t from-gray-600 to-gray-500 hover:from-gray-800 hover:to-gray-700 text-white",
  };

  // ボタンのスタイルを決定
  const styles = ` shadow rounded-lg shadow transition  ${className} ${sizeClasses[size]} ${colorClasses[color]}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
};
