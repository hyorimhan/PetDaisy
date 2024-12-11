import Error from "@/components/common/Error/Error";
import Loading from "@/components/common/Loading/Loading";
import { useGetMedicalExpenses } from "@/hooks/useGetMedicalExpenses";
import { MedicalVisits } from "@/types/medical";
import { calculateTotal } from "@/utils/format/calculateTotal";
import Link from "next/link";

interface MedicalCardProps {
  list: MedicalVisits;
}
function MedicalCard({ list }: MedicalCardProps) {
  const { medicalExpenses, isPending, isError } = useGetMedicalExpenses(
    list.pet_id,
    list.id
  );

  if (isPending) return <Loading />;
  if (isError) return <Error />;

  const totalArray = medicalExpenses.map((expense) => {
    return expense.price;
  });

  const totalPrice = calculateTotal(totalArray);

  return (
    <Link
      className="flex flex-col gap-2 bg-main-1 py-3 px-3 rounded-lg"
      href={`/dashboard/medicalDetail/${list.id}`}
    >
      <div className="flex justify-between items-center text-gray-3 text-[12px]">
        <span>{list.visit_date}</span>
        <span>{list.hospital_name}</span>
      </div>
      <div className="flex justify-between items-center text-[16px]">
        <h4>{list.title}</h4>
        <span className="text-red-4">{totalPrice}</span>
      </div>
    </Link>
  );
}

export default MedicalCard;
