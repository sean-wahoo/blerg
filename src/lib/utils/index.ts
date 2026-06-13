import { ImageLoader } from "next/image";

export const mdxImageLoader: ImageLoader = ({ src }) => {
  console.log({ p: process.env.NEXT_PUBLIC_BASE_URL, src })
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}${src}`);
  return url.toString();
};
export * from "./client";
export * from "./server";
