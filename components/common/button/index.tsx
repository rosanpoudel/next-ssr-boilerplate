"use client";
import React from "react";

export interface ButtonTypes {
  children: React.ReactNode | string;
       onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  padding?: string;
  [key: string]: any; // For any additional custom styles
}

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  bgColor = "",
  borderColor = "",
  textColor = "",
  padding = "",
  ...customStyles // Spread operator to capture any additional custom styles
}: ButtonTypes) => {
  const baseClasses =
    "rounded focus:outline-none hover:shadow-xl transition duration-300 ease-in-out";
  let variantClasses = "";
  let sizeClasses = "";

  // Variant classes
  switch (variant) {
    case "primary":
      variantClasses = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "secondary":
      variantClasses = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "danger":
      variantClasses = "bg-red-500 text-white hover:bg-red-600";
      break;
    default:
      variantClasses = "bg-blue-500 text-white hover:bg-blue-600";
  }

  // Size classes
  switch (size) {
    case "small":
      sizeClasses = "px-2 py-1 text-sm";
      break;
    case "medium":
      sizeClasses = "px-4 py-2 text-base";
      break;
    case "large":
      sizeClasses = "px-6 py-3 text-lg";
      break;
    default:
      sizeClasses = "px-4 py-2 text-base";
  }

  const styles = {
    backgroundColor: bgColor || undefined,
    borderColor: borderColor || undefined,
    color: textColor || undefined,
    padding: padding || undefined,
    borderWidth: borderColor ? "1px" : undefined,
    ...customStyles, // Spread custom styles
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={styles}
    >
      {children}
    </button>
  );
};

export default Button;
