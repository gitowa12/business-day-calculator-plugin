import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  color?: "blue" | "red" | "yellow" | "green" | "gray";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
}

// OutlinedButton コンポーネント
export const SecondaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  color = "blue",
  size = "md",
  onClick,
}) => {
  const sizeClasses = {
    xs: "text-xs py-1 px-2",
    sm: "text-sm py-2 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-2 px-5",
    xl: "text-xl py-3 px-6",
  };

  const colorClasses = {
    // blue: "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white",
    blue: "text-blue-600 outline-blue-600 hover:bg-blue-600  hover:text-white",
    red: "text-red-600 outline-red-600 hover:bg-red-600 hover:text-white",
    yellow:
      "text-yellow-600 outline-yellow-600 hover:bg-yellow-600 hover:text-white",
    green:
      "text-green-600 outline-green-600 hover:bg-green-600 hover:text-white",
    gray: "text-gray-600 outline-gray-600 hover:bg-gray-600 hover:text-white",
  };

  const styles = `shadow rounded-lg outline outline-2 outline-offset-[-1px] transition  ${className} ${sizeClasses[size]} ${colorClasses[color]}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
};
