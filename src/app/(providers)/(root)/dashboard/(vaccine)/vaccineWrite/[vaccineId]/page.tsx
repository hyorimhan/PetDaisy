import Page from "@/components/common/Page/Page";
import EditForm from "@/components/features/dashboard/vaccine/write/EditForm";

async function VaccineEditPage({ params }: { params: { vaccineId: string } }) {
  const { vaccineId } = await params;
  return (
    <Page>
      <EditForm vaccineId={vaccineId} />
    </Page>
  );
}

export default VaccineEditPage;
