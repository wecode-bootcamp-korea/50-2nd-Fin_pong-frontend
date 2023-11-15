export const splitDate = (rawDate) => {
  const year = rawDate.getFullYear();
  const month = rawDate.getMonth();
  const date = rawDate.getDate();

  return { year, month, date };
};
