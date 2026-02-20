import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeUnwrapImages from "rehype-unwrap-images";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/blog",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  turbopack: {
    root: "../",
  },
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
  assetPrefix: "/blog-static",
  rewrites: async () => [
    {
      source: "/blog/images/:path*",
      destination: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/images/:path*`,
    },
  ],
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
