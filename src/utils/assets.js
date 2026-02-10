export const assetPath = (path) => {
  if (!path) {
    return "";
  }

  if (path.startsWith("/")) {
    return `/assets${path}`;
  }

  return `/assets/${path}`;
};
