import type { Metadata } from "next";
import { Inter, Domine } from "next/font/google";
import localFont from "next/font/local";
import "@/styling/globals.scss";
import { c } from "@/lib/utils";
import JotaiProvider from "./jotaiProvider";
import { PageMetadata } from "@/stores/pages";
import fs from "node:fs/promises";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const domine = Domine({
  variable: "--font-domine",
});

const iosevka = localFont({
  variable: "--font-iosevka",
  src: "./IosevkaNerdFont-Regular.ttf",
});

export const metadata: Metadata = {
  title: "blerg",
  description: "like a blog but worse",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const files = await fs.readdir(`${process.cwd()}/src/markdown`);
  const fileNames = files
    .filter((file) => !file.includes("home"))
    .map((file) => {
      return file.replace(".mdx", "");
      // .replace(/!^[a-zA-Z0-9_-]*$/g, "-")
    });
  const pagesMap = new Map<string, PageMetadata>();
  for (const page of fileNames) {
    const { metadata } = await import(`@/markdown/${page}.mdx`);
    pagesMap.set(page, metadata);
  }

  // console.log({ pagesMap, files });

  return (
    <JotaiProvider initialState={pagesMap}>
      <html lang="en">
        <body
          className={c(inter.className, domine.className, iosevka.className)}
        >
          {children}
        </body>
      </html>
    </JotaiProvider>
  );
}
