import { MedicalVisits } from "@/types/medical";

interface MedicalCardProps {
  list: MedicalVisits;
}
function MedicalCard({ list }: MedicalCardProps) {
  return <div>MedicalCard</div>;
}

export default MedicalCard;
