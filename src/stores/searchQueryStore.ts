import { create } from "zustand";
import { JobDetail, JobItem } from "../types";
import { BASE_URL } from "../lib/constants";

type Store = {
  jobItems: JobItem[];
  isLoading: boolean;
  isLoadingDetail: boolean;
  selectedJobItem: JobDetail | undefined;
  selectedJobItemId: number;
  searchRequest: (query: string) => Promise<void>;
  setSelectedJobItem: (id: number) => void;
};

export const searchQueryStore = create<Store>((set) => ({
  jobItems: [],
  isLoading: false,
  selectedJobItem: undefined,
  selectedJobItemId: 0,
  isLoadingDetail: false,
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
    if (!id) return;
    set(() => ({ selectedJobItemId: id, isLoadingDetail: true }));
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      console.error("Failed to fetch job items");
      return;
    }
    const data = await response.json();
    console.log(data);
    set(() => ({ selectedJobItem: data.jobItem, isLoadingDetail: false }));
  },
}));
