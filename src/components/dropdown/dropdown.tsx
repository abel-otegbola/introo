'use client'
import { ReactNode, useState } from "react";

type option = {
  id: string | number;
  icon?: ReactNode;
  title: string;
}

interface dropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string | undefined;
    options?: option[];
    size?: "sm" | "md" | "lg";
}

export default function Dropdown({ className, disabled, label, name, options, value, onChange, error, size = "md" }: dropdownProps) {
    const [focus, setFocus] = useState(false)

    return (
        <div className={`relative flex flex-col gap-[2px] ${className}`}>
            <div className="flex justify-between gap-4">
                { label ? <label htmlFor={name} className={`text-[14px] font-bold ${focus ? "text-primary" : ""}`}>{label}</label> : "" }
                { error && !focus ? <p className="px-2 text-[12px] italic text-[#C22026] backdrop-blur-sm">{error}</p> : "" }
            </div>

            <div className={`flex items-center relative rounded-[12px] bg-transparent w-full border duration-500 z-[1] bg-white/[0.08] w-full p-1 duration-500 
                ${error && !focus ? "border-[#C22026] text-red-500" : "border-gray-500/[0.2]"}
                ${focus ? "border-black shadow-input-active" : " "}
                ${ className }
            `}>
                <span className="text-[16px]">
                  {/* <Map /> */}
                </span>
                <select
                    className={`p-2 w-[97%] outline-none bg-transparent cursor-pointer
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                        ${size === "sm" ? "text-sm py-[1px]" : size === "lg" ? "text-lg py-[12px]" : "text-md py-[10px]"}
                    `}
                    name={name}
                    value={value}
                    id={name}
                    onClick={() => setFocus(!focus)}
                    onChange={(e) => {onChange(e.target.value)}}
                >
                  {
                    options?.map(option => (
                      <option className="p-4 h-[40px] bg-white dark:bg-black" key={option.id} value={option.id}>{option.title}</option>
                    ))
                  }
                </select>
            </div>
        </div>
    )
}