import { readAndCompressImage } from "browser-image-resizer";

const config = {
  quality: 0.5,
  maxWidth: 300,
  maxHeight: 300,
  autoRotate: true,
  debug: true,
};

export const imgResizer = async (file) => {
  return file.size > 1024 * 10
    ? await readAndCompressImage(file, config)
    : file;
};
