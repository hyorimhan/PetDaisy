"use client";
import Card from "@/components/common/Card/Card";
import { VACCINE_ICON_LIST, VACCINE_TYPE } from "@/constants/vaccine";
import { Vaccinations } from "@/types/vaccine";
import Image from "next/image";

interface HasVaccineIconProps {
  vaccinations: Vaccinations;
}
function HasVaccineIcon({ vaccinations }: HasVaccineIconProps) {
  const hasVaccine = (vaccineKey: string) => {
    return vaccinations.some(
      (vaccination) =>
        vaccination.vaccine_name ===
        VACCINE_TYPE[vaccineKey as keyof typeof VACCINE_TYPE]
    );
  };

  return (
    <ul className="grid grid-cols-3 gap-3">
      {VACCINE_ICON_LIST.map((vaccine) => (
        <li key={vaccine.key}>
          <Card>
            <div
              className={`flex flex-col justify-center items-center gap-[10px] text-[14px] py-6 ${
                hasVaccine(vaccine.key) ? "text-main-5" : "text-gray-3"
              }`}
            >
              <Image
                src={`${
                  hasVaccine(vaccine.key)
                    ? "/img/icon/icon-vaccine-on.svg"
                    : "/img/icon/icon-vaccine.svg"
                }`}
                width={40}
                height={0}
                alt="백신 아이콘"
              />
              <span className="whitespace-pre-line text-center">
                {vaccine.value}
              </span>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default HasVaccineIcon;
