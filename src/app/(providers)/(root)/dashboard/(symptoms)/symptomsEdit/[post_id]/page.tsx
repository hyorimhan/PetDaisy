import Page from "@/components/common/Page/Page";
import SymptomsEdit from "@/components/features/dashboard/symptoms/SymptomsEdit";
import { paramsType } from "@/types/common";
import React from "react";

const SymptomsEditPage = async ({ params }: paramsType) => {
  const { post_id } = await params;
  return (
    <Page>
      <SymptomsEdit post_id={post_id ?? ""} />
    </Page>
  );
};

export default SymptomsEditPage;
