import { Vaccination } from "@/types/vaccine";
import VaccineAction from "./VaccineAction";

interface VaccineCardProps {
  vaccination: Vaccination;
}
function VaccineCard({ vaccination }: VaccineCardProps) {
  return (
    <div className="flex flex-col gap-2 bg-main-1 py-3 px-3 rounded-lg">
      <div className="flex justify-between items-center text-gray-3 text-[12px]">
        <span>{vaccination.vaccination_date}</span>
        <span>{vaccination.hospital_name}</span>
      </div>
      <div>
        <div className="flex justify-between items-center text-[16px]">
          <h4 className="line-clamp-2">{vaccination.vaccine_name}</h4>
          <span className="text-red-4">
            {vaccination.price.toLocaleString()}원
          </span>
        </div>
        <p className="text-[14px] text-gray-3">{vaccination.note}</p>
        <VaccineAction vaccineId={vaccination.id} />
      </div>
    </div>
  );
}

export default VaccineCard;
