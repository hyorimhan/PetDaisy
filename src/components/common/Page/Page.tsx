import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return <div className="w-[320px] px-3 mx-auto">{children}</div>;
}

export default Page;
