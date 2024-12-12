export const MEDICAL_DATE_VALIDATION = () => ({
  required: "진료 날짜를 선택해주세요.",
});

export const MEDICAL_HOSPITAL_VALIDATION = () => ({
  required: "병원 이름을 입력해주세요",
  maxLength: {
    value: 20,
    message: "병원이름은 20자까지 입력 가능합니다",
  },
});
export const MEDICAL_TITLE_VALIDATION = () => ({
  required: "진료 기록 제목을 입력해주세요",
  maxLength: {
    value: 30,
    message: "진료 기록 제목은 30자까지 입력 가능합니다",
  },
});

export const MEDICAL_CONTENT_VALIDATION = () => ({
  required: "진료 기록 내용을 입력해주세요",
  mixLength: {
    value: 1,
    message: "진료 기록 내용은 1자 이상 입력해주세요",
  },
  maxLength: {
    value: 500,
    message: "진료 기록 제목은 500자까지 입력 가능합니다",
  },
});

export const MEDICAL_EXPENSES_SERVICE_VALIDATION = () => ({
  required: "진료 항목을 입력해주세요",
  mixLength: {
    value: 1,
    message: "진료 항목은 1자 이상 입력해주세요",
  },
  maxLength: {
    value: 20,
    message: "진료 기록 제목은 20자까지 입력 가능합니다",
  },
});

export const MEDICAL_EXPENSES_PRICE_VALIDATION = () => ({
  valueAsNumber: true,
  required: "진료 비용을 입력해주세요",
  min: {
    value: 0,
    message: "진료비는 0원 이상 입력해주세요",
  },
  max: {
    value: 999999999,
    message: "진료비는 999,999,999원 이하로 입력해주세요",
  },
});
