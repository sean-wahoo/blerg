"use client";
import { ComponentPropsWithoutRef } from "react";
import ShikiHighlighter from "react-shiki";

const CodeComponent = ({
  language = "ts",
  children,
  ...props
}: ComponentPropsWithoutRef<"code"> & { language: string }) => {
  return (
    <ShikiHighlighter {...props} language={language} theme="kanagawa-dragon">
      {children as string}
    </ShikiHighlighter>
  );
};
export default CodeComponent;
