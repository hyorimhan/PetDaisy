import Page from "@/components/common/Page/Page";
import EditForm from "@/components/features/dashboard/petRegistration/EditForm";
import { ParamsType } from "@/types/common";

async function PetProfileEditPage({ params }: ParamsType) {
  const { petId } = await params;
  return (
    <Page>
      <EditForm petId={petId ?? ""} />
    </Page>
  );
}

export default PetProfileEditPage;
