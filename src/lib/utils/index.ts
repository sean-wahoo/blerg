import { ImageLoader } from "next/image";

export const mdxImageLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/blog${src}`);
  return url.toString();
};
export * from "./client";
export * from "./server";
