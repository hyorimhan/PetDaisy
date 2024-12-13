import Page from "@/components/common/Page/Page";
import SymptomDetail from "@/components/features/dashboard/symptoms/SymptomDetail";
import { paramsType } from "@/types/common";
import React from "react";

const SymptomDetailPage = async ({ params }: paramsType) => {
  const { post_id } = await params;
  return (
    <Page>
      <SymptomDetail post_id={post_id ?? ""} />
    </Page>
  );
};

export default SymptomDetailPage;
