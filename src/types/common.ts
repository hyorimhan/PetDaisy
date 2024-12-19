export type ParamsType = {
  params: Promise<{
    id?: string;
    petId?: string;
    postId?: string;
    visitId?: string;
    vaccineId?: string;
    userId?: string;
  }>;
};

export type SearchDateType = {
  year: number;
  month: number;
};
