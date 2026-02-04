import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import CodeComponent from "@/components/code";

const components = {
  a: ({ children, ...props }) => <Link {...props}>{children}</Link>,
  code: ({ children, ...props }) => (
    <CodeComponent {...props}>{children}</CodeComponent>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
