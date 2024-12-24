import { EmptyDelete } from "./common";

export const PET_NAME_VALIDATION = () => ({
  required: "이름은 필수 항목입니다.",
  minLength: {
    value: 2,
    message: "이름은 최소 2자 이상 입력해주세요",
  },
  maxLength: {
    value: 4,
    message: "이름은 4자까지 입력 가능합니다",
  },
  ...EmptyDelete,
});

export const PET_BIRTH_VALIDATION = () => ({
  required: "생일을 입력해주세요.",
});

export const PET_WEIGHT_VALIDATION = () => ({
  required: "몸무게를 입력해주세요.",
  max: {
    value: 100,
    message: "몸무게는 최대 100kg까지 입력 가능합니다.",
  },
  min: {
    value: 0.0,
    message: "몸무게는 최소 0kg 이상 입력해주세요.",
  },
});

export const PET_GENDER_VALIDATION = () => ({
  required: "성별을 선택해주세요.",
});

export const PET_NEUTERED_VALIDATION = () => ({
  required: "중성화 여부를 선택해주세요.",
});
