import { PropsWithChildren } from 'react';

function Page({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="bg-gradient-1 w-[360px] md:w-[600px] mx-auto px-3">
      {children}
    </div>
  );
}

export default Page;
