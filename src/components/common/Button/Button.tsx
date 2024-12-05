import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type ButtonBaseProps = {
  content: string;
  types?: "sm" | "md" | "lg" | "addInfo";
  bgColor?: string;
  textColor?: string;
  outlineColor?: string;
  isActive?: boolean;
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
  isActive = false,
  ...props
}: ButtonProps) {
  const variantStyle = {
    sm: "py-[7px] px-[18px] rounded-lg text-[14px]",
    md: "w-full py-4 rounded-lg text-[14px]",
    lg: "w-full py-5 text-[20px] rounded-lg text-center",
    addInfo:
      "w-full py-[10px] text-[14px] rounded-lg flex items-center justify-center border border-main-3 bg-white gap-[7px] text-main-3",
  };
  const activeStyle = "border border-main-5 text-main-5";

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
        className={`bg-white border ${outlineColor} ${textColor} ${
          variantStyle[types]
        } ${isActive && activeStyle}`}
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
