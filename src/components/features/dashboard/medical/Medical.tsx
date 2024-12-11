import Card from "@/components/common/Card/Card";
import Link from "next/link";

function Medical() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] text-main-5">진료 기록</h3>
        <Link
          href="/dashboard/medicalDetail"
          className="text-[12px] text-gray-3 shrink-0"
        >
          자세히 보기
        </Link>
      </div>
    </Card>
  );
}

export default Medical;
