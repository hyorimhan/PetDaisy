import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  content: string;
  href?: string;
  type: "sm" | "md" | "lg" | "add";
  bgColor?: string;
  textColor?: string;
  outlineColor?: string;
}
function Button({ content, href, bgColor, type, textColor, outlineColor, ...props }: ButtonProps) {
  const variantStyle = {
    sm: "py-[7px] px-[18px] rounded-lg text-[14px]",
    md: "py-4 px-[50px] rounded-lg text-[14px]",
    lg: "w-full py-5 text-[20px] rounded-lg",
    add: "w-full py-[10px] text-[14px] rounded-lg flex items-center justify-center border border-main-3 bg-white gap-[7px] text-main-3",
  };

  if (href)
    return (
      <Link className={`${bgColor} ${textColor} ${variantStyle[type]}`} href={href}>
        {content}
      </Link>
    );

  if (outlineColor) {
    return (
      <button className={`bg-white border ${outlineColor} ${textColor} ${variantStyle[type]} `} {...props}>
        {content}
      </button>
    );
  }

  if (type === "add") {
    return (
      <button className={`${textColor} ${variantStyle[type]} `} {...props}>
        <Image src="/img/icon/add.svg" alt="플러스 아이콘" width={20} height={0} />
        {content}
      </button>
    );
  }

  return (
    <button className={`${bgColor} ${textColor} ${variantStyle[type]}`} {...props}>
      {content}
    </button>
  );
}

export default Button;
