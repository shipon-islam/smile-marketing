export const getExtention = (file) => {
  const ext = file.split(".").pop().split("?")[0];
  return ext;
};
