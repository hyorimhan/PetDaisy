function NextVisitDate({ nextVisitDate }: { nextVisitDate: string }) {
  return (
    <div className="mt-5">
      <h5 className="text-[12px] text-gray-3">다음 진료 일정</h5>
      <span>{nextVisitDate}</span>
    </div>
  );
}

export default NextVisitDate;
