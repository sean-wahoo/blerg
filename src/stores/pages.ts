"use client";
import fs from "node:fs/promises";
import { atom } from "jotai";
// import { getMDXPages } from "@/lib/utils";
// const mdxPages = await getMDXPages();

export interface PageMetadata {
  [key: string]: string | string[];
}

export const _pagesAtom = atom(new Map<string, PageMetadata>());
export const pagesAtom = atom(
  (get) => get(_pagesAtom),
  (_get, set, newPages: Map<string, PageMetadata>) => {
    set(_pagesAtom, newPages);
  },
);

// const pagesAtom = atom(async () => {
//   const files = await fs.readdir(`${process.cwd()}/src/markdown`);
//   const fileNames = files.map((file) => {
//     return file.replace(".mdx", "");
//     // .replace(/!^[a-zA-Z0-9_-]*$/g, "-")
//   });
//   const pagesMap = new Map<string, PageMetadata>();
//   for (const page of fileNames) {
//     const { metadata } = await import(`@/markdown/${page}.mdx`);
//     pagesMap.set(page, metadata);
//   }
//   return pagesMap;
// });

export const getPagesAtom = atom((get) => get(pagesAtom));
// export const setPagesAtom = atom((set) => get(pagesAtom));
// const pagesAsyncAtom = atom(null, async (set) => {
//   const pagesMap = new Map<string, { [key: string]: string | string[] }>();
//   for (const page of mdxPages) {
//     const { metadata } = await import(`@/markdown/${page}.mdx`);
//     pagesMap.set(page, metadata);
//   }
//   set(pagesAtom, pagesMap);
// });
