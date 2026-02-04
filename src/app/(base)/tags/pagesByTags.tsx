"use client";
import { useAtom } from "jotai";
import { pagesAtom } from "@/stores/pages";

const PagesByTags = ({ tags }: { tags: string[] }) => {
  const [pages] = useAtom(pagesAtom);

  const matchingPages = pages
    .entries()
    .filter(([, metadata]) => {
      if (!tags.length || !metadata.tags?.length) {
        return true;
      }
      return tags.every((tag) => metadata.tags?.includes(tag));
    })
    .map(([page, metadata]) => ({ page, ...metadata }));
  return (
    <>
      {matchingPages.map((pageData) => {
        return <div key={pageData.page}>{pageData.page}</div>;
      })}
    </>
  );
};

export default PagesByTags;
