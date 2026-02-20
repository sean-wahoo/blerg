import Link from "next/link";
import styles from "./page.module.scss";
import PagesList from "@/components/pagesList";
const Home = () => {
  return (
    <section className={styles.home_page}>
      <header /> {/* shut up */}
      <main>
        <h1>hello.</h1>
        <h3>
          this is where i (
          <Link href="https://seanline.dev" target="_blank">
            sean
          </Link>
          ) say my bullshit.
        </h3>
        <h3>
          since you&apos;re already here, why don&apos;t you read my bullshit?
        </h3>
        <PagesList />
      </main>
    </section>
  );
};

export default Home;
