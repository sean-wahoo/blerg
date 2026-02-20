import { Suspense } from "react";
import styles from "./tags.module.scss";
import TagsForm from "./tagsForm";

const TagsPage = () => {
  return (
    <section className={styles.tags_page}>
      <Suspense>
        <TagsForm />
      </Suspense>
    </section>
  );
};

export default TagsPage;
