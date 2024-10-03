"use client"
import React, { useCallback, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

export const PopoverPicker = ({ color, onChange }:{color:string,onChange:(newColor: string) => void}) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="relative">
      <div
        className="size-11 rounded-full border-[3px] shadow-md cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="absolute top-[52px] left-0 rounded-md shadow-md z-30" ref={popover}>
          <HexAlphaColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
