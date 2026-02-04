"use server";
import fs from "node:fs/promises";

export const getMDXPages = async () => {
  const files = await fs.readdir(`${process.cwd()}/src/markdown`);
  return files.map((file) => {
    return file.replace(".mdx", "");
    // .replace(/!^[a-zA-Z0-9_-]*$/g, "-")
  });
};

export const getPageTags = async () => {
  const pages = await getMDXPages();
  const tags = new Map<string, string[]>();
  for (const page of pages) {
    const { metadata } = await import(`@/markdown/${page}.mdx`);
    if ("tags" in metadata) {
      console.log(metadata.tags);
      for (const tag of metadata.tags as string[]) {
        tags.set(page, [...(tags.get(page) ?? []), tag]);
      }
    }
  }

  return tags;
};
