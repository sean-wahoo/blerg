import styles from "./page.module.scss";
import { getMDXPages } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";

interface PathProps {
  slug: string;
}

const getPageData = cache(async (slug: string) => {
  const { default: Page, metadata } = await import(`@/markdown/${slug}.mdx`);
  return { Page, metadata };
});

const MDXPage = async ({ params }: { params: Promise<PathProps> }) => {
  const { slug } = await params;
  const { Page, metadata } = await getPageData(slug);
  if (metadata.no_header) {
    return (
      <section className={styles.markdown_page}>
        <header />
        <main>
          <Page />
        </main>
      </section>
    );
  }
  return (
    <section className={styles.markdown_page}>
      <header>
        <h1>{metadata.title}</h1>
        <p>
          {new Date(metadata.date).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </p>
      </header>
      <main>
        <Page />
      </main>
    </section>
  );
};

export default MDXPage;

export async function generateMetadata(
  { params }: { params: Promise<PathProps> },
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await getPageData(slug);

  return metadata;
}

export async function generateStaticParams() {
  const files = await getMDXPages();
  const pages = files.map((file) => ({ slug: file }));
  return pages;
}

export const dynamicParams = false;
