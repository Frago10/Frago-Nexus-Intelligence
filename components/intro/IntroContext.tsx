"use client";

import { createContext, useContext, useState } from "react";

export type IntroState = "loading" | "intro" | "done";

type Ctx = {
  state: IntroState;
  scrollProgress: { current: number };
  advance: (s: IntroState) => void;
};

const IntroCtx = createContext<Ctx>({
  state: "loading",
  scrollProgress: { current: 0 },
  advance: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IntroState>("loading");
  // mutable ref-like object; updated imperatively to avoid re-renders on scroll
  const scrollProgress = useState(() => ({ current: 0 }))[0];

  return (
    <IntroCtx.Provider value={{ state, scrollProgress, advance: setState }}>
      {children}
    </IntroCtx.Provider>
  );
}

export function useIntro() {
  return useContext(IntroCtx);
}
