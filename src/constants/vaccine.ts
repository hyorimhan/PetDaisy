export const VACCINE_TYPE = {
  COMBINED_VACCINE_1ST: "종합 백신 1차 접종",
  COMBINED_VACCINE_2ND: "종합 백신 2차 접종",
  COMBINED_VACCINE_3RD: "종합 백신 3차 접종",
  COMBINED_VACCINE_BOOSTER: "종합 백신 추가 접종",
  RABIES_VACCINE: "광견병 예방 접종",
  LEUKEMIA_VACCINE: "백혈병 예방 접종",
  PERITONITIS_VACCINE: "복막염 예방 접종",
};

export const VACCINE_TYPE_LIST = Object.entries(VACCINE_TYPE).map(
  ([key, value], index) => ({
    key: index,
    value: value,
  })
);
export const VACCINE_ICON = {
  COMBINED_VACCINE_1ST: "1개월\n종합 백신 1차 접종",
  COMBINED_VACCINE_2ND: "2개월\n종합 백신 2차 접종",
  COMBINED_VACCINE_3RD: "3개월\n종합 백신 3차 접종",
  RABIES_VACCINE: "광견병\n예방 접종",
  LEUKEMIA_VACCINE: "백혈병\n예방 접종",
  PERITONITIS_VACCINE: "복막염\n예방 접종",
};

export const VACCINE_ICON_LIST = Object.entries(VACCINE_ICON).map(
  ([key, value]) => ({
    key: key,
    value: value,
  })
);
