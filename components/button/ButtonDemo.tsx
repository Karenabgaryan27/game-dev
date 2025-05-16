"use client";

import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const buttonStyles = {
  default: {
    primary: "",
    // success: "bg-green-600 hover:bg-green-500",
    success: "bg-success hover:bg-success-hover",
    // warning: "bg-yellow-600 hover:bg-yellow-500",
    blue: "bg-bluish hover:bg-bluish-hover",
    warning: "bg-warning hover:bg-warning-hover",
    danger: "bg-danger hover:bg-danger-hover",
  },
  secondary: {
    primary: "bg-gray-200 hover:bg-gray-300",
    success: "bg-green-50 hover:bg-green-100 text-green-600",
    blue: "bg-bluish hover:bg-bluish-hover",
    warning: "bg-yellow-50 hover:bg-yellow-100 text-yellow-600",
    danger: "bg-danger hover:bg-danger-hover",
  },
  outline: {
    primary: "",
    success: "bg-transparent text-green-600 hover:text-green-600 border-green-200 hover:border-green-300 hover:bg-[rgba(0,255,0,0.03)]",
    blue: "bg-transparent bg-bluish hover:bg-bluish-hover",
    warning:
      "bg-transparent text-yellow-600 hover:text-yellow-600 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50",
    danger: "bg-transparent text-red-600 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-[rgba(255,0,0,0.03)]",
  },
  ghost: {
    primary: "",
    success: "text-green-600 hover:text-green-600 hover:bg-green-50",
    blue: "bg-bluish hover:bg-bluish-hover",
    warning: "text-yellow-600 hover:text-yellow-600 hover:bg-yellow-50",
    danger: " hover:bg-red-100 !text-red-500 ",
  },
  destructive: {
    primary: "",
    success: "bg-red-600 hover:bg-red-500",
    blue: "bg-bluish hover:bg-bluish-hover",
    warning: "bg-orange-600 hover:bg-orange-500",
    danger: "bg-danger hover:bg-danger-hover",
  },
  link: {
    primary: "",
    success: "text-green-600 hover:text-green-500",
    blue: "bg-bluish hover:bg-bluish-hover",
    warning: "text-yellow-600 hover:text-yellow-500",
    danger: "bg-danger hover:bg-danger-hover",
  },
};

type ButtonDemoProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  text?: ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  icon?: ReactElement | null;
  startIcon?: ReactElement | null;
  endIcon?: ReactElement | null;
  color?: "primary" |  "success" | "warning" | "danger" | "blue";
  disabled?: boolean;
  onClick?: () => void;
};

export function ButtonDemo({
  className = "",
  text = "",
  variant = "default",
  size = "default",
  icon = null,
  startIcon = null,
  endIcon = null,
  color = "primary",
  disabled = false,
  onClick = () => {},
  ...props
}: ButtonDemoProps) {
  const [buttonStyle, setButtonStyle] = useState("");

  useEffect(() => {
    const buttonStylesVariant = buttonStyles[variant];

    if (buttonStylesVariant) {
      const buttonStylesColor = buttonStylesVariant[color];
      setButtonStyle(buttonStylesColor);
    }
  }, []);

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      className={`${className} ${buttonStyle} cursor-pointer shadow-sm shadow-[rgba(255,255,255,.5)] ${size=='sm' ? ' rounded-sm text-xs':''}`}
      onClick={onClick}
      {...props}
    >
      {startIcon}
      {text}
      {icon}
      {endIcon}
      {/* <div data-type={type}></div> */}
    </Button>
  );
}
