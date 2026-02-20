"use client";
import { Provider } from "jotai";
import { HydrationBoundary } from "jotai-ssr";
import { pagesAtom, PageMetadata } from "@/stores/pages";
import { MetaType } from "@/lib/utils";

export default function JotaiProvider({
  initialState,
  children,
}: {
  initialState: Map<string, MetaType>;
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <HydrationBoundary hydrateAtoms={[[pagesAtom, initialState]] as const}>
        {children}
      </HydrationBoundary>
    </Provider>
  );
}
