export const getSerializeData = (data) => {
  return data.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
};
