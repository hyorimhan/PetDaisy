import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";

function Symptoms() {
  return (
    <Card>
      <div className="w-full h-[12.5rem]">
        <CardTitle title="관찰 기록" link="/dashboard/symptomsList" />
        <div className="w-full h-[65px] bg-violet-50 rounded-lg"></div>
      </div>
    </Card>
  );
}

export default Symptoms;
