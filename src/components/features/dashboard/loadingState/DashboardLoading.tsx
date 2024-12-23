import Loading from "@/components/common/Loading/Loading";
import Page from "@/components/common/Page/Page";
import React from "react";
import PetList from "../petList/PetList";

function DashboardLoading() {
  return (
    <>
      <PetList />
      <Page>
        <Loading />
      </Page>
    </>
  );
}

export default DashboardLoading;
