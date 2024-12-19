import Page from "@/components/common/Page/Page";
import SymptomsEdit from "@/components/features/dashboard/symptoms/SymptomsEdit";
import { ParamsType } from "@/types/common";
import React from "react";

const SymptomsEditPage = async ({ params }: ParamsType) => {
  const { postId } = await params;
  return (
    <Page>
      <SymptomsEdit postId={postId ?? ""} />
    </Page>
  );
};

export default SymptomsEditPage;
