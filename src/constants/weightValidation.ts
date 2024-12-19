export const DATE_VALIDATION = () => ({
  required: "날짜를 등록해주세요",
});

export const WEIGHT_VALIDATION = () => ({
  required: "몸무게를 입력해주세요",
  pattern: {
    value: /^\d*\.?\d*$/,
    message: "올바른 숫자 형식으로 입력해주세요",
  },
  validate: {
    lessThan100: (value: string) =>
      !value || Number(value) <= 100 || "100kg 이하로 입력해주세요",
    moreThan0: (value: string) =>
      !value || Number(value) > 0 || "0보다 큰 값을 입력해주세요",
  },
});
