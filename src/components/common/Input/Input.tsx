import { ComponentProps, useId } from "react";
type InputProps = {
  label: string;
  type: "text" | "password" | "email";
  invalid?: boolean;
} & ComponentProps<"input">;
function Input({ label, type, invalid, ...props }: InputProps) {
  invalid = invalid || false;
  const inputId = useId();
  return (
    <>
      <div
        className={`flex flex-col gap-1 justify-center bg-white p-[15px] rounded-lg ${
          invalid ? "border border-red-5" : "ring-0"
        }`}
      >
        <label className="text-[14px] text-gray-3 font-semibold" htmlFor={inputId}>
          {label}
        </label>
        <input
          className="text-[16px] text-gray-4 focus:ring-0 focus-visible:outline-none"
          id={inputId}
          type={type}
          {...props}
        />
      </div>
      {invalid && <p className="text-[12px] text-red-5">올바른 형식이 아닙니다</p>}
    </>
  );
}

export default Input;
