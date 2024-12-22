import { EmptyDelete } from "./common";

export const VACCINE_HOSPITAL_VALIDATION = () => ({
  required: "병원 이름을 입력해주세요",
  maxLength: {
    value: 20,
    message: "병원이름은 20자까지 입력 가능합니다",
  },
  ...EmptyDelete,
});

export const VACCINE_MEMO_VALIDATION = () => ({
  maxLength: {
    value: 50,
    message: "메모는 50자까지 입력 가능합니다",
  },
  ...EmptyDelete,
});

export const VACCINE_PRICE_VALIDATION = () => ({
  required: "비용을 입력해주세요",
  max: 999999999,
  min: 0,
});
