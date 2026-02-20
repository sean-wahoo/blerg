"use server";
import { ImageLoader } from "next/image";
import fs from "node:fs/promises";

export const getMDXPages = async () => {
  const files = await fs.readdir(`${process.cwd()}/src/markdown`);
  return files.map((file) => {
    return file.replace(".mdx", "");
  });
};

export interface MetaType {
  page: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  span?: number;
}

export const getPageMetadata = async (page?: string) => {
  if (page) {
    const { metadata } = await import(`@/markdown/${page}.mdx`);
    return [{ page: page, ...metadata }] as [MetaType];
  }
  const pages = await getMDXPages();
  return Promise.all(
    pages.map(async (page) => {
      const { metadata } = await import(`@/markdown/${page}.mdx`);
      return { page, ...metadata } as MetaType;
    }),
  );
};

export const getPageTags = async () => {
  const pages = await getMDXPages();
  const tags = new Map<string, string[]>();
  for (const page of pages) {
    const { metadata } = await import(`@/markdown/${page}.mdx`);
    if ("tags" in metadata) {
      for (const tag of metadata.tags as string[]) {
        tags.set(page, [...(tags.get(page) ?? []), tag]);
      }
    }
  }

  return tags;
};
