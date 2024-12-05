import { ComponentProps, useId } from "react";
import { FieldError } from "react-hook-form";
type InputProps = {
  label: string;
  type: "text" | "password" | "email";
  error?: FieldError;
  unit?: string;
} & ComponentProps<"input">;
function Input({ label, type, error, unit, ...props }: InputProps) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex flex-col gap-1 justify-center bg-white p-[15px] rounded-lg ${
          error ? "border border-red-5" : "ring-0"
        }`}
      >
        <label
          className="text-[14px] text-gray-3 font-semibold"
          htmlFor={inputId}
        >
          {label}
        </label>
        <div className="flex justify-between items-center">
          <input
            className="w-full text-[16px] text-gray-4 focus:ring-0 focus-visible:outline-none"
            id={inputId}
            type={type}
            {...props}
          />
          {unit && (
            <span className="text-[16px] text-gray-4 shrink-0">{unit}</span>
          )}
        </div>
      </div>
      {error && <p className="text-[12px] text-red-5">{error.message}</p>}
    </div>
  );
}

export default Input;
