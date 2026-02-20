"use client";
import { atom } from "jotai";
import { MetaType } from "@/lib/utils";

export interface PageMetadata {
  [key: string]: string | string[];
}

export const _pagesAtom = atom(new Map<string, MetaType>());
export const pagesAtom = atom(
  (get) => get(_pagesAtom),
  (_get, set, newPages: Map<string, MetaType>) => {
    set(_pagesAtom, newPages);
  },
);

export const getPagesAtom = atom((get) => get(pagesAtom));
