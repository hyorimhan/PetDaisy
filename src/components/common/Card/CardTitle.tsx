import Link from "next/link";

function CardTitle({ title, link }: { title: string; link: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-[16px] text-main-5">{title}</h3>
      <Link href={link} className="text-[12px] text-gray-3 shrink-0">
        자세히 보기
      </Link>
    </div>
  );
}

export default CardTitle;
