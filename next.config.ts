import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // turbopack: {
  //   root: "../",
  // },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        hostname: "tenor.com",
      },
    ],
  },
  experimental: {
    mdxRs: false,
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-unwrap-images"],
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "metadata" }],
    ],
  },
});

export default withMDX(nextConfig);
// export default nextConfig;
