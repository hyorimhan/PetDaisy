import { useGetMedicalVisitLists } from "@/hooks/useGetMedicaVisitlLists";
import { usePetStore } from "@/zustand/usePetStore";
import MedicalCard from "./MedicalCard";

function MedicalList() {
  const petId = usePetStore((state) => state.petId) as string;
  const { medicalLists } = useGetMedicalVisitLists(petId);

  return (
    <ul>
      {medicalLists.map((list) => (
        <li key={list.id}>
          <MedicalCard list={list} />
        </li>
      ))}
    </ul>
  );
}

export default MedicalList;
