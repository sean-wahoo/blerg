import { getPageMetadata } from "@/lib/utils";
import styles from "./recent.module.scss";
import { PageItem } from "@/components/pagesList";

const Recent = async () => {
  const pageMetas = await getPageMetadata();

  return (
    <section>
      <main className={styles.recent_items}>
        {pageMetas.length > 0 ? (
          pageMetas
            .sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB.getTime() - dateA.getTime();
            })
            .map((meta) => (
              <PageItem page={meta.page} metadata={meta} key={meta.page} />
            ))
        ) : (
          <p>nothing yet!</p>
        )}
      </main>
    </section>
  );
};

export default Recent;
