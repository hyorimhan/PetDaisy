export const DATE_VALIDATION = () => ({
  required: "날짜를 등록해주세요",
});

export const WEIGHT_VALIDATION = () => ({
  required: "몸무게를 입력해주세요",
  maxLength: {
    value: 4,
    message: "몸무게를 올바르게 입력해주세요",
  },
});
