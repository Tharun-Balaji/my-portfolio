export const assetPath = (path) => {
  if (!path) {
    return "";
  }

  const appBase = "/my-portfolio/";
  const normalizedBase = appBase.endsWith("/") ? appBase : `${appBase}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${normalizedBase}assets/${normalizedPath}`;
};

export const homePath = "/my-portfolio/";
