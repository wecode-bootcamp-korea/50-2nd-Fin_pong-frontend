export const splitDate = (rawDate) => {
  const year = rawDate.getFullYear();
  const month = rawDate.getMonth() + 1;
  const date = rawDate.getDate();

  return { year, month, date };
};
