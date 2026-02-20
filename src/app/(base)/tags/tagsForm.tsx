"use client";
import { c, getPageTags, MetaType } from "@/lib/utils";
import styles from "./tags.module.scss";
import {
  ChangeEventHandler,
  FormEventHandler,
  Suspense,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import PagesList from "@/components/pagesList";

const TagsForm = () => {
  const [pageTags, setPageTags] = useState<Map<string, string[]>>();
  const [pageTagValues, setPageTagValues] = useState<string[]>([]);
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const searchParams = useSearchParams();

  const tagInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchTags(searchParams.getAll("tag"));
  }, [searchParams]);

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

  const [downArrow, setDownArrow] = useState<boolean>(false);

  const onTagInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.value.length > 0) {
      setDownArrow(true);
    } else {
      setDownArrow(false);
    }
  };

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const onTagInputSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputValue = (formData.get("page-search") as string) || "";
    const splitValue = inputValue.split(" ").filter((tag) => tag.length);
    const newSearchTags = [...searchTags];
    for (const value of splitValue) {
      if (!searchTags.includes(value) && searchTags.length < 5) {
        newSearchTags.push(value);
      }
    }
    (document.getElementById("page-search") as HTMLInputElement).value = "";
    setDownArrow(false);
    setSearchTags(newSearchTags);
  };

  const onTagDelete: UIEventHandler<HTMLSpanElement> = (e) => {
    const tagValue = e.currentTarget.dataset["tag"];
    const newSearchTags = searchTags.filter((tag) => tag !== tagValue);
    setSearchTags(newSearchTags);
  };
  const tagsFilterFunc = ([, metadata]: [page: string, metadata: MetaType]) => {
    if (!searchTags.length || !metadata.tags?.length) {
      return true;
    }
    return searchTags.every((tag) => metadata.tags?.includes(tag));
  };
  return (
    <>
      <form onSubmit={onTagInputSubmit}>
        {pageTags?.size ? (
          <datalist id="tags-list">
            {pageTagValues.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </datalist>
        ) : null}
        <div className={styles.input_container}>
          <button
            ref={submitButtonRef}
            type="submit"
            className={c(
              styles.tag_submit_button,
              downArrow ? styles.shown : "",
            )}
          >
            ⇣
          </button>
          <input
            id="page-search"
            name="page-search"
            type="text"
            list="tags-list"
            defaultValue={searchParams.get("tag") || ""}
            ref={tagInputRef}
            onChange={onTagInputChange}
            className={downArrow ? styles.down_arrow : ""}
          />
        </div>
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
      <PagesList filterFunc={tagsFilterFunc} />
    </>
  );
};

export default TagsForm;
