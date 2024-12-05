"use client";
import Image from "next/image";
import { useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Option from "./Option";

interface OptionProps<TFieldValues extends FieldValues> {
  key: number;
  value: PathValue<TFieldValues, Path<TFieldValues>>;
}
interface SelectProps<TFieldValues extends FieldValues> {
  label: string;
  options: OptionProps<TFieldValues>[];
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  registerOptions?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}

function Select<TFieldValues extends FieldValues>({
  label,
  options = [],
  name,
  register,
  registerOptions,
}: SelectProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    PathValue<TFieldValues, Path<TFieldValues>> | undefined
  >(undefined);

  const handleSelectOption = (
    option: PathValue<TFieldValues, Path<TFieldValues>>
  ) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex flex-col gap-1 justify-center bg-white p-[15px] rounded-lg">
        <div className="text-[14px] text-gray-3 font-semibold">{label}</div>
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className="text-gray-4"
            {...register(name, {
              ...registerOptions,
              value: selectedOption,
            })}
          >
            {selectedOption || "선택"}
          </span>
          <Image
            src="/img/icon/arrow-down.svg"
            width={16}
            height={16}
            alt="화살표"
          />
        </div>
        {isOpen && (
          <Option options={options} handleSelectOption={handleSelectOption} />
        )}
      </div>
      {!selectedOption && (
        <p className="text-[12px] text-red-5">옵션을 선택해주세요.</p>
      )}
    </div>
  );
}

export default Select;
