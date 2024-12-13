import Card from "../Card/Card";

function Empty({ content }: { content: string }) {
  return (
    <Card>
      <div className="text-gray-4 flex justify-center items-center py-[120px]">
        {content}
      </div>
    </Card>
  );
}

export default Empty;
