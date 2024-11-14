// This function constructs a full URL for an image asset based on the provided path.
// It uses the PUBLIC_URL environment variable for the base URL.
export const getImageUrl = (path) => {
  // Construct and return the full URL by appending the path to the base URL.
  return `${process.env.PUBLIC_URL}/assets/${path}`;
};
