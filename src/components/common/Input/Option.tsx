import { FieldValues, Path, PathValue } from "react-hook-form";

interface OptionProps<TFieldValues extends FieldValues> {
  options: { key: number; value: string }[];
  handleSelectOption: (
    option: PathValue<TFieldValues, Path<TFieldValues>>
  ) => void;
}
function Option({ options, handleSelectOption }: OptionProps<FieldValues>) {
  return (
    <ul className="absolute left-0 top-[60px] w-full bg-white py-[15px] rounded-b-lg">
      {options.map((option) => (
        <li
          key={option.key}
          className="py-2 px-[15px] text-gray-4 hover:bg-main-2"
          onClick={() => handleSelectOption(option.value)}
        >
          {option.value}
        </li>
      ))}
    </ul>
  );
}

export default Option;
