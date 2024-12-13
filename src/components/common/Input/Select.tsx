"use client";
import Image from "next/image";
import { useState } from "react";
import {
  FieldError,
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
  error?: FieldError;
  register: UseFormRegister<TFieldValues>;
  registerOptions?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  setValue: (
    name: Path<TFieldValues>,
    value: PathValue<TFieldValues, Path<TFieldValues>>
  ) => void;
  onChange?: (value: PathValue<TFieldValues, Path<TFieldValues>>) => void;
}

function Select<TFieldValues extends FieldValues>({
  label,
  options = [],
  name,
  error,
  register,
  registerOptions,
  setValue,
  onChange,
}: SelectProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    PathValue<TFieldValues, Path<TFieldValues>> | undefined
  >(undefined);

  const handleSelectOption = (
    option: PathValue<TFieldValues, Path<TFieldValues>>
  ) => {
    setValue(name, option);
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      console.log("Select onChange called with:", option);
      onChange(option);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className={`relative flex flex-col gap-1 justify-center bg-white p-[15px] rounded-lg ${
          error ? "border border-red-5" : "ring-0"
        }`}
      >
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
      {error && <p className="text-[12px] text-red-5">{error.message}</p>}
    </div>
  );
}

export default Select;
