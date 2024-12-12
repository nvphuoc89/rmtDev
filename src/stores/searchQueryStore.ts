import { create } from "zustand";
import { JobItem } from "../types";

type Store = {
  jobItems: JobItem[];
  searchRequest: (query: string) => Promise<void>;
};

export const searchQueryStore = create<Store>((set) => ({
  jobItems: [],
  searchRequest: async (query: string) => {
    const response = await fetch(
      `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${query}`
    );

    if (!response.ok) {
      console.error("Failed to fetch job items");
      return;
    }

    const data = await response.json();
    set(() => ({ jobItems: data.jobItems }));
  },
}));
