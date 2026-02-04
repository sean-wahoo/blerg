"use client";
import styles from "./pagesList.module.scss";
import Link from "next/link";
import { useAtom } from "jotai";
import { getPagesAtom, type PageMetadata } from "@/stores/pages";

const PageItem = ({
  page,
  metadata,
}: {
  page: string;
  metadata: PageMetadata;
}) => {
  return (
    <div className={styles.page_item}>
      <header>
        <h4>
          <Link href={`/${page}`}>{metadata.title}</Link>
        </h4>
        <p>{metadata.date}</p>
      </header>
      <p className={styles.description}>{metadata.description}</p>
    </div>
  );
};

const PagesList = () => {
  const [pages] = useAtom(getPagesAtom);
  return (
    <div className={styles.pages_list}>
      {Array.from(pages.entries()).map(([page, metadata]) => (
        <PageItem key={page} page={page} metadata={metadata} />
      ))}
    </div>
  );
};

export default PagesList;
