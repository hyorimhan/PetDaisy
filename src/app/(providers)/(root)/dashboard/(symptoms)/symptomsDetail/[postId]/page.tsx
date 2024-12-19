import Page from "@/components/common/Page/Page";
import SymptomDetail from "@/components/features/dashboard/symptoms/SymptomDetail";
import React from "react";
import { ParamsType } from "../../../../../../../types/common";

const SymptomDetailPage = async ({ params }: ParamsType) => {
  const { postId } = await params;
  return (
    <Page>
      <SymptomDetail postId={postId ?? ""} />
    </Page>
  );
};

export default SymptomDetailPage;
