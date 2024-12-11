import Input from "@/components/common/Input/Input";

function DetailFormField() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Input label="날짜" type="date" />
        <Input label="병원명" type="text" />
        <Input label="제목" type="text" />
        <Input label="내용" type="textarea" />
        <Input label="다음 방문 일정" type="date" />
      </div>
    </>
  );
}

export default DetailFormField;
