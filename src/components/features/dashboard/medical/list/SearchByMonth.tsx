"use client";
import Select from "@/components/common/Input/Select";
import { MONTH, YEARS } from "@/constants/common";
import { SearchDateType } from "@/types/common";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

function SearchByMonth({
  onSearch,
}: {
  onSearch: (year: number, month: number) => void;
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchDateType>();

  const { year, month } = watch();

  useEffect(() => {
    if (year && month) {
      onSearch(year, month);
    }
  }, [year, month, onSearch]);

  return (
    <div className="w-full flex gap-3 mb-3">
      <Select
        label="년"
        options={YEARS}
        name="year"
        register={register}
        error={errors.year}
        setValue={setValue}
      />
      <Select
        label="월"
        options={MONTH}
        name="month"
        register={register}
        error={errors.month}
        setValue={setValue}
      />
    </div>
  );
}

export default SearchByMonth;
