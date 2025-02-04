export const getTotalCount = (data = []) => {
  const count = data.filter((item) => item.active);
  return count.length;
};
