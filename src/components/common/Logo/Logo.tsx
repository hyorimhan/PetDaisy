import Image from "next/image";

interface LogoProps {
  size: "md" | "lg";
}
function Logo({ size }: LogoProps) {
  const logoPathBySize = {
    md: "/img/logo-md.webp",
    lg: "/img/logo-lg.webp",
  };
  return (
    <h1>
      <Image src={logoPathBySize[size]} width={210} height={0} alt="PET DAISY" />
    </h1>
  );
}

export default Logo;