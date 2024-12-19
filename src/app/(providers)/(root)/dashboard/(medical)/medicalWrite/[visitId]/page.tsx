import Page from "@/components/common/Page/Page";
import EditForm from "@/components/features/dashboard/medical/write/EditForm";
import { ParamsType } from "@/types/common";

async function MedicalEditpage({ params }: ParamsType) {
  const { visitId } = await params;
  return (
    <Page>
      <EditForm visitId={visitId ?? ""} />
    </Page>
  );
}

export default MedicalEditpage;
