import { getPageMetadata } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(props: {
  page: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  let page;
  if (typeof props !== "undefined") {
    page = await props.page;
  }
  const metadata = await getPageMetadata(page);
  const sitemaps = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date(),
    },
  ];

  sitemaps.push(
    ...metadata.map((meta) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${meta.page}`,
      lastModified: new Date(meta.date),
      changeFrequency: "never",
      priority: 0.6,
    })),
  );

  return sitemaps;
}
