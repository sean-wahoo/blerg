export const c = (...args: string[]) => {
  return args.join(" ");
};

type Breakpoint = "mobile" | "desktop";

export const mediaQuery = (breakpoint: Breakpoint) => {
  if (typeof window === undefined) {
    return;
  }

  let query = "";

  switch (breakpoint) {
    case "mobile":
      query = "(width <= 476px)";
      break;
    case "desktop":
      query = "(width <= 1024px)";
  }

  const queryResponse = window.matchMedia(query);

  return queryResponse;
};
