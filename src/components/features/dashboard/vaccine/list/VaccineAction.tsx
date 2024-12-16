import Link from "next/link";

interface VaccineActionProps {
  vaccineId: string;
}
function VaccineAction({ vaccineId }: VaccineActionProps) {
  const onDelete = (vaccineId: string) => {};
  return (
    <ul className="flex justify-end items-center gap-1 text-[14px] text-gray-3">
      <li>
        <Link href={`/dashboard/vaccineWrite/${vaccineId}`}>수정</Link>
      </li>
      <li className="pretendard">・</li>
      <li>
        <button type="button" onClick={() => onDelete(vaccineId)}>
          삭제
        </button>
      </li>
    </ul>
  );
}

export default VaccineAction;
