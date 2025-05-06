"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";

type SwitchDemoProps = {
  className?: string;
  label?: string;
  color?: "primary" | "success" | "warning" | "danger" | "dark";
  checked?: boolean;
  disabled?: boolean;
  callback?: (isChecked: boolean, id: string) => void;
};

export function SwitchDemo({
  className = "",
  label = "",
  color = "primary",
  disabled = false,
  checked = false,
  callback = ()=>{}
}: SwitchDemoProps) {
  const [id, setId] = useState("");
    const [isChecked, setIsChecked] = useState(checked);
  
    const handleChange = (checked: boolean) => {
      setIsChecked(checked);
      callback(checked, id);
    };
  
    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

  useEffect(() => setId(uuidv4()), []);

  return (
    <div className={`switch flex items-center space-x-2  ${className} `} data-color={color}>
      <Switch className="cursor-pointer" id={id} disabled={disabled} checked={isChecked} onCheckedChange={handleChange} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
}
