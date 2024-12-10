import Page from "@/components/common/Page/Page";
import PetList from "@/components/features/dashboard/petList/PetList";
import Symptoms from "@/components/features/dashboard/symptoms/Symptoms";
import Weight from "@/components/features/dashboard/weight/Weight";

const DashboardPage = () => {
  return (
    <>
      <PetList />
      <Page>
        <div className="space-y-3">
          <Weight />
          <Symptoms />
        </div>
      </Page>
    </>
  );
};

export default DashboardPage;
