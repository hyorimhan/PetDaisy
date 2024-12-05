"use client";
import Image from "next/image";
import { useState } from "react";
import Option from "./Option";

interface OptionProps {
  key: number;
  value: string;
}

interface SelectProps {
  label: string;
  options: OptionProps[];
}
function Select({ label, options = [] }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <>
      <div className="relative flex flex-col gap-1 justify-center bg-white p-[15px] rounded-lg">
        <div className="text-[14px] text-gray-3 font-semibold">{label}</div>
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-gray-4">{selectedOption || "선택"}</span>
          <Image
            src="/img/icon/arrow-down.svg"
            width={16}
            height={16}
            alt="화살표"
          />
        </div>
        {isOpen && <Option options={options} handleSelect={handleSelect} />}
      </div>
    </>
  );
}

export default Select;
