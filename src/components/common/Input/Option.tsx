interface OptionProps {
  options: { key: number; value: string }[];
  handleSelect: (option: string) => void;
}
function Option({ options, handleSelect }: OptionProps) {
  return (
    <ul className="absolute left-0 top-[60px] w-full bg-white py-[15px] rounded-b-lg">
      {options.map((option) => (
        <li
          key={option.key}
          className="py-2 px-[15px] text-gray-4 hover:bg-main-2"
          onClick={() => handleSelect(option.value)}
        >
          {option.value}
        </li>
      ))}
    </ul>
  );
}

export default Option;
