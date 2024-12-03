import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

type ButtonBaseProps = {
  content: string;
  types: 'sm' | 'md' | 'lg' | 'add';
  bgColor?: string;
  textColor?: string;
  outlineColor?: string;
};

type ButtonProps = ButtonBaseProps & {
  href?: string;
} & Omit<ComponentProps<'button'>, keyof ButtonBaseProps | 'href'>;

function Button({
  href,
  content,
  bgColor,
  types,
  textColor,
  outlineColor,
  ...props
}: ButtonProps) {
  const variantStyle = {
    sm: 'py-[7px] px-[18px] rounded-lg text-[14px]',
    md: 'py-4 px-[50px] rounded-lg text-[14px]',
    lg: 'w-full py-5 text-[20px] rounded-lg text-center',
    add: 'w-full py-[10px] text-[14px] rounded-lg flex items-center justify-center border border-main-3 bg-white gap-[7px] text-main-3',
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

  if (outlineColor) {
    return (
      <button
        className={`bg-white border ${outlineColor} ${textColor} ${variantStyle[types]}`}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (types === 'add') {
    return (
      <button className={`${textColor} ${variantStyle[types]}`} {...props}>
        <Image
          src="/img/icon/add.svg"
          alt="플러스 아이콘"
          width={20}
          height={20}
        />
        {content}
      </button>
    );
  }

  return (
    <button
      className={`${bgColor} ${textColor} ${variantStyle[types]}`}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
