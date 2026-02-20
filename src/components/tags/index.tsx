"use client";
import { MetaType } from "@/lib/utils";
import styles from "./tags.module.scss";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

const Tags = ({ meta }: { meta: MetaType }) => {
  const router = useRouter();
  const tagOnClick: MouseEventHandler = (e) => {
    const tag = e.currentTarget.id.replace(meta.page, "");
    router.push(`/blog/tags?tag=${encodeURIComponent(tag)}`);
  };
  return (
    <ul className={styles.page_tags}>
      {meta.tags?.map((tag) => {
        const num = tag.length % 5;
        return (
          <li
            onClick={tagOnClick}
            className={styles[`tag_${num}`]}
            key={tag}
            id={tag + meta.page}
          >
            {tag}
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
