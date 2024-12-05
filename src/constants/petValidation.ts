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
