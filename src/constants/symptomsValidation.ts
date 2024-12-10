export const TITLE_VALIDATION = () => ({
  required: "제목을 입력해주세요",
  maxLength: {
    value: 15,
    message: "15자 이상 입력하실 수 없습니다",
  },
});

export const CONTENT_VALIDATION = () => ({
  required: "내용을 입력해주세요",
  maxLength: {
    value: 300,
    message: "300자 이상 입력하실 수 없습니다",
  },
});
