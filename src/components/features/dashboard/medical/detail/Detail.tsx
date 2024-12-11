import Card from "@/components/common/Card/Card";
import { MedicalVisits } from "@/types/medical";

function Detail({ details }: { details: MedicalVisits }) {
  return (
    <Card>
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between text-[12px] text-gray-3">
          <span>{details.visit_date}</span>
          <span>{details.hospital_name}</span>
        </div>
        <h4 className="text-[20px]">{details.title}</h4>
        <p className="text-gray-4">{details.content}</p>
        {details.next_visit_date && (
          <div className="mt-5">
            <h5 className="text-[12px] text-gray-3">다음 진료 일정</h5>
            <span>{details.next_visit_date}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Detail;
