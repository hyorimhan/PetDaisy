export const calculateAge = (birthdate: Date) => {
  const today = new Date();
  const diff = today.getTime() - birthdate.getTime();
  const ageYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const ageMonths = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)
  );

  if (diff < 0) {
    return "0개월";
  }

  const totalMonths = ageYears * 12 + ageMonths;

  if (totalMonths <= 12) {
    return `${totalMonths}개월`;
  } else {
    const displayYears = Math.floor(totalMonths / 12);
    return `만 ${displayYears}살`;
  }
};
