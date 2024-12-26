import { EmptyDelete } from "./common";

export const TITLE_VALIDATION = () => ({
  required: "제목을 입력해주세요",
  maxLength: {
    value: 15,
    message: "15자 이상 입력하실 수 없습니다",
  },
  ...EmptyDelete,
});

export const CONTENT_VALIDATION = () => ({
  required: "내용을 입력해주세요",
  maxLength: {
    value: 500,
    message: "500자 이상 입력하실 수 없습니다",
  },
  ...EmptyDelete,
});
