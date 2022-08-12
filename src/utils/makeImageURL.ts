export const makeImageURL = (id: string, width: number) =>
  `https://mj-gallery.com/cdn-cgi/image/width=${width},format=webp/${id}/grid_0.webp`;

export const makeImageURLS = (id: string, width: number) =>
  sizes
    .concat(width)
    .filter((size) => size <= width)
    .map((size) => `${makeImageURL(id, size)} ${size}w`)
    .join(', ');

const sizes = Array.from({ length: 10 }, (_, i) => i * 180 + 180);
