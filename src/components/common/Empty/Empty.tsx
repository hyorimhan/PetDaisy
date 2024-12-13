function Empty({ content }: { content: string }) {
  return (
    <div className="text-gray-4 flex justify-center items-center py-[120px]">
      {content}
    </div>
  );
}

export default Empty;
