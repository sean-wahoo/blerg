"use client";
import { Provider } from "jotai";
import { HydrationBoundary } from "jotai-ssr";
import { pagesAtom, PageMetadata } from "@/stores/pages";

export default function JotaiProvider({
  initialState,
  children,
}: {
  initialState: Map<string, PageMetadata>;
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
