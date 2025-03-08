export const checkFileExtByUrl = (url) => {
  const splitUrl = url.split(".");
  const extName = splitUrl[splitUrl.length - 1];
  return extName;
};
