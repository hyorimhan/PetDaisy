import Card from "@/components/common/Card/Card";
import Page from "@/components/common/Page/Page";
import React from "react";
import PetList from "../petList/PetList";

function NoDataLoading() {
  return (
    <>
      <PetList />
      <Page>
        <Card>
          <div className="py-[120px] text-center text-gray-4">
            반려 동물을 등록해주세요.
          </div>
        </Card>
      </Page>
    </>
  );
}

export default NoDataLoading;
