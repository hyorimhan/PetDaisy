import Page from "@/components/common/Page/Page";
import EditForm from "@/components/features/dashboard/vaccine/write/EditForm";
import { ParamsType } from "@/types/common";

async function VaccineEditPage({ params }: ParamsType) {
  const { vaccineId } = await params;
  return (
    <Page>
      <EditForm vaccineId={vaccineId ?? ""} />
    </Page>
  );
}

export default VaccineEditPage;
