"use client";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetMedicalExpenses } from "@/hooks/useGetMedicalExpenses";
import { calculateTotal } from "@/utils/format/calculateTotal";

function ExpenseList({ visitId }: { visitId: string }) {
  const { medicalExpenses, isPending, isError } =
    useGetMedicalExpenses(visitId);

  const totalPrice = calculateTotal(
    medicalExpenses.map((expense) => expense.price)
  );
  return (
    <QueryStateHandler
      data={medicalExpenses}
      isPending={isPending}
      isError={isError}
    >
      <Card>
        <div className="flex justify-between items-center text-main-5 text-[14px]">
          <h5>진료 항목</h5>
          <h5>비용</h5>
        </div>
        <ul className="flex flex-col gap-1 my-2">
          {medicalExpenses.map((expense) => (
            <li key={expense.id}>
              <div className="flex justify-between items-center text-gray-3 text-[16px]">
                <span className="flex-1">{expense.service}</span>
                <span className="flex-1 text-right">
                  {expense.price > 999999999 ? 999999999 : expense.price}원
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center text-[16px]">
          <h5 className="text-green-5">총합</h5>
          <span className="text-red-4">{totalPrice}원</span>
        </div>
      </Card>
    </QueryStateHandler>
  );
}

export default ExpenseList;
