import { useDeleteVaccine } from "@/hooks/vaccine/useDeleteVaccine";
import Link from "next/link";

interface VaccineActionProps {
  vaccineId: string;
}
function VaccineAction({ vaccineId }: VaccineActionProps) {
  const { handleDeleteVaccine } = useDeleteVaccine();
  return (
    <ul className="flex justify-end items-center gap-1 text-[14px] text-gray-3">
      <li>
        <Link href={`/dashboard/vaccineWrite/${vaccineId}`}>수정</Link>
      </li>
      <li className="pretendard">・</li>
      <li>
        <button type="button" onClick={() => handleDeleteVaccine(vaccineId)}>
          삭제
        </button>
      </li>
    </ul>
  );
}

export default VaccineAction;
