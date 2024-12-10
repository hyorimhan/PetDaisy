import { PropsWithChildren } from "react";

function PetListBox({ children }: PropsWithChildren) {
  return (
    <div className="bg-main-1 w-[360px] md:w-[600px] mx-auto p-3">
      {children}
    </div>
  );
}

export default PetListBox;
