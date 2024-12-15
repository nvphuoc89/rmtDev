import { useEffect, useState } from "react";
import { searchQueryStore } from "../stores/searchQueryStore";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";
import { JobDetail } from "../types";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1));
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [activeId]);
  return [activeId, setActiveId] as const;
}

type JobItemResponse = {
  public: boolean;
  jobItem: JobDetail;
};

const fetchJobItem = async (id: number): Promise<JobItemResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isFetching } = useQuery(
    ["job-item", id],
    () => fetchJobItem(id!),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: () => {},
    }
  );
  return [data?.jobItem, isFetching] as const;
}

export function useSearchRequest(searchText: string) {
  const searchRequest = searchQueryStore((state) => state.searchRequest);
  useEffect(() => {
    if (!searchText.trim()) return;
    searchRequest(searchText);
  }, [searchText, searchRequest]);
}

export function useDebounced<T>(value: T, timeOut: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), timeOut);
    return () => clearTimeout(timerId);
  }, [value, timeOut]);

  return debounced;
}
