"use client";
import styles from "./pagesList.module.scss";
import Link from "next/link";
import { useAtom } from "jotai";
import { getPagesAtom } from "@/stores/pages";
import { c, MetaType } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Tags from "../tags";

export const PageItem = ({
  page,
  metadata,
}: {
  page: string;
  metadata: MetaType;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (itemRef.current) {
      console.log({ metadata });
      if (metadata.span) {
        itemRef.current.style.gridColumnEnd = `span ${metadata.span}`;
      }
    }
  }, [metadata]);
  return (
    <div ref={itemRef} className={styles.page_item}>
      <header>
        <h4>
          <Link href={`/${page}`}>{metadata.title}</Link>
        </h4>
        <p>{metadata.date}</p>
      </header>
      <main>
        <p className={styles.description}>{metadata.description}</p>
        <Tags meta={metadata} />
      </main>
    </div>
  );
};

const defaultSortFunc = (a: [string, MetaType], b: [string, MetaType]) => {
  return new Date(b[1].date).getTime() - new Date(a[1].date).getTime();
};

const PagesList = ({
  filterFunc,
  sortFunc = defaultSortFunc,
}: {
  filterFunc?: (arr: [string, MetaType]) => boolean;
  sortFunc?: (a: [string, MetaType], b: [string, MetaType]) => number;
}) => {
  const [pages] = useAtom(getPagesAtom);
  let matchingPages = pages;
  if (filterFunc) {
    matchingPages = new Map(
      matchingPages
        .entries()
        .filter(filterFunc)
        .map((arr) => arr),
    );
  }
  return (
    <div className={c(styles.pages_list, filterFunc ? styles.filtered : "")}>
      {(matchingPages ?? pages).size > 0 ? (
        Array.from((matchingPages ?? pages).entries())
          .sort(sortFunc)
          .map(([page, metadata]) => (
            <PageItem key={page} page={page} metadata={metadata} />
          ))
      ) : (
        <p>nothing yet!</p>
      )}
    </div>
  );
};

export default PagesList;
