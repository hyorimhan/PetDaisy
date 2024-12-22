import Link from "next/link";

function Empty({ content, href }: { content: string; href: string }) {
  return (
    <Link
      href={href}
      className="text-gray-4 flex justify-center items-center py-[120px]"
    >
      {content}
    </Link>
  );
}

export default Empty;
