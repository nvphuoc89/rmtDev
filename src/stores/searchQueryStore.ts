import { create } from "zustand";
import { JobItem } from "../types";
import { BASE_URL } from "../lib/constants";

type Store = {
  jobItems: JobItem[];
  isLoading: boolean;
  selectedJobItem: JobItem | undefined;
  searchRequest: (query: string) => Promise<void>;
  setSelectedJobItem: (id: number) => void;
};

export const searchQueryStore = create<Store>((set) => ({
  jobItems: [],
  isLoading: false,
  selectedJobItem: undefined,
  searchRequest: async (query: string) => {
    set(() => ({ isLoading: true }));

    const response = await fetch(`${BASE_URL}?search=${query}`);

    if (!response.ok) {
      console.error("Failed to fetch job items");
      return;
    }

    const data = await response.json();
    set(() => ({ jobItems: data.jobItems, isLoading: false }));
  },
  setSelectedJobItem: async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      console.error("Failed to fetch job items");
      return;
    }
    const data = await response.json();
    console.log(data);
    set(() => ({ selectedJobItem: data.jobItem }));
  },
}));
