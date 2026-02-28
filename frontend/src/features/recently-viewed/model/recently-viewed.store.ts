import { create } from "zustand";
import type { RecentlyViewedBook } from "./types";

type State = {
  items: RecentlyViewedBook[];
  add: (book: RecentlyViewedBook) => void;
  clear: () => void;
};

const load = (): RecentlyViewedBook[] => {
  try {
    const books = localStorage.getItem("recently-viewed");
    return books ? JSON.parse(books) : [];
  } catch {
    return [];
  }
};

const save = (items: RecentlyViewedBook[]) => {
  localStorage.setItem("recently-viewed", JSON.stringify(items));
};

export const useRecentlyViewedStore = create<State>((set, get) => ({
  items: load(),

  add: (book) => {
    const prev = get().items;

    const next = [book, ...prev.filter((x) => x.id !== book.id)].slice(0, 10);

    save(next);
    set({ items: next });
  },

  clear: () => {
    save([]);
    set({ items: [] });
  },
}));
