"use client";
import { getPageTags } from "@/lib/utils";
import styles from "./tags.module.scss";
import { FormEventHandler, UIEventHandler, useEffect, useState } from "react";
import PagesByTags from "./pagesByTags";
// const pageTags = await getPageTags();
const TagsPage = () => {
  const [pageTags, setPageTags] = useState<Map<string, string[]>>();
  const [pageTagValues, setPageTagValues] = useState<string[]>([]);
  const [searchTags, setSearchTags] = useState<string[]>([]);

  useEffect(() => {
    getPageTags().then((tags) => {
      setPageTags(tags);
      const tagValues: string[] = [];
      tags.values().forEach((tags) => {
        for (const tag of tags) {
          if (!tagValues.includes(tag)) {
            tagValues.push(tag);
            continue;
          }
        }
      });

      setPageTagValues(tagValues);
    });
  }, []);

  const onTagInputSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = (formData.get("page-search") as string) || "";
    const splitValue = inputValue.split(" ").filter((tag) => tag.length);
    const newSearchTags = [...searchTags];
    for (const value of splitValue) {
      if (!searchTags.includes(value)) {
        newSearchTags.push(value);
      }
    }
    (document.getElementById("page-search") as HTMLInputElement).value = "";
    setSearchTags(newSearchTags);
  };

  const onTagDelete: UIEventHandler<HTMLSpanElement> = (e) => {
    const tagValue = e.currentTarget.dataset["tag"];
    const newSearchTags = searchTags.filter((tag) => tag !== tagValue);
    console.log({ tagValue, newSearchTags });
    setSearchTags(newSearchTags);
  };

  return (
    <section className={styles.tags_page}>
      <form onSubmit={onTagInputSubmit}>
        {pageTags?.size ? (
          <datalist id="tags-list">
            {pageTagValues.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </datalist>
        ) : null}
        <input
          id="page-search"
          name="page-search"
          type="text"
          list="tags-list"
        />
        <div className={styles.tags_area}>
          {searchTags.map((tag) => (
            <span
              className={styles.tag}
              onClick={onTagDelete}
              data-tag={tag}
              key={tag}
            >
              {`${tag} `}✕
            </span>
          ))}
        </div>
      </form>
      <PagesByTags tags={searchTags} />
    </section>
  );
};

export default TagsPage;
