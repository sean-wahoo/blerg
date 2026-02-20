import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import CodeComponent from "@/components/code";
import "./mdx.module.scss";
import styles from "./mdx.module.scss";
import { c } from "./lib/utils";
import MdxImage from "./components/img";

const badBlockElements = ["img", "canvas"];

const components = {
  a: ({ children, ...props }) => <Link {...props}>{children}</Link>,
  p: ({ className, children, ...props }) => {
    for (const child of children) {
      if ("type" in { ...child }) {
        console.log({ child });
        if (
          badBlockElements.includes(child.type) ||
          badBlockElements.includes(child.type.name)
        ) {
          return <>{children}</>;
        }
      }
    }
    return (
      <p {...props} className={c(styles.p, className)}>
        {children}
      </p>
    );
  },
  h1: ({ className, ...props }) => (
    <h1 {...props} className={c(styles.h1, className)} />
  ),
  h2: ({ className, ...props }) => (
    <h2 {...props} className={c(styles.h2, className)} />
  ),
  h3: ({ className, ...props }) => (
    <h3 {...props} className={c(styles.h3, className)} />
  ),
  h4: ({ className, ...props }) => (
    <h4 {...props} className={c(styles.h4, className)} />
  ),
  h5: ({ className, ...props }) => (
    <h5 {...props} className={c(styles.h5, className)} />
  ),
  h6: ({ className, ...props }) => (
    <h6 {...props} className={c(styles.h6, className)} />
  ),
  img: (props) => {
    return <MdxImage {...props} className={styles.img} />;
  },
  code: ({ children, ...props }) => (
    <CodeComponent {...props}>{children}</CodeComponent>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
