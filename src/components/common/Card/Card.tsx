import { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
  return (
    <div className="w-full py-3 px-3 bg-white rounded-lg shadow-shadow">
      {children}
    </div>
  );
}

export default Card;
