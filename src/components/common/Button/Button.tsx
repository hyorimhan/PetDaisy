import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type ButtonBaseProps = {
  content: string;
  types?: "sm" | "md" | "lg" | "addInfo";
  bgColor?: string;
  textColor?: string;
  outlineColor?: string;
};

type LinkProps = ButtonBaseProps & {
  href: string;
} & ComponentProps<typeof Link>;

type NativeButtonProps = ButtonBaseProps & {
  href?: never;
} & ComponentProps<"button">;

type ButtonProps = LinkProps | NativeButtonProps;
function Button({
  href,
  content,
  bgColor,
  types = "md",
  textColor,
  outlineColor,
  ...props
}: ButtonProps) {
  const variantStyle = {
    sm: "py-[7px] px-[18px] rounded-lg text-[14px]",
    md: "py-4 px-[50px] rounded-lg text-[14px]",
    lg: "w-full py-5 text-[20px] rounded-lg text-center",
    addInfo:
      "w-full py-[10px] text-[14px] rounded-lg flex items-center justify-center border border-main-3 bg-white gap-[7px] text-main-3",
  };

  if (href) {
    return (
      <Link
        className={`${bgColor} ${textColor} ${variantStyle[types]}`}
        href={href}
      >
        {content}
      </Link>
    );
  }

  if (href && types === "addInfo") {
    return (
      <Link href={href} className={`${variantStyle[types]}`}>
        <Image
          src="/img/icon/add.svg"
          alt="플러스 아이콘"
          width={20}
          height={20}
        />
        {content}
      </Link>
    );
  }

  if (outlineColor) {
    return (
      <button
        className={`bg-white border ${outlineColor} ${textColor} ${variantStyle[types]}`}
        {...(props as ComponentProps<"button">)}
      >
        {content}
      </button>
    );
  }

  return (
    <button
      className={`${bgColor} ${textColor} ${variantStyle[types]}`}
      {...(props as ComponentProps<"button">)}
    >
      {content}
    </button>
  );
}

export default Button;
