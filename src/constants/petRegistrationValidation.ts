export const PET_NAME_VALIDATION = () => ({
  required: "닉네임을 입력해주세요",
  minLength: {
    value: 2,
    message: "닉네임은 최소 2자 이상 입력해주세요",
  },
  maxLength: {
    value: 4,
    message: "닉네임은 4자까지 입력 가능합니다",
  },
});

export const PET_BIRTH_VALIDATION = () => ({
  required: "날짜를 선택해주세요.",
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
  required: "옵션을 선택해주세요.",
});

export const PET_NEUTERED_VALIDATION = () => ({
  required: "옵션을 선택해주세요.",
});
