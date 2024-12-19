import { RefObject, useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";
import { JobDetail, JobItem } from "../types";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemContext } from "../contexts/JobItemContextProvider";

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
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
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
      onError: (e) => handleError(e),
    }
  );
  return [data?.jobItem, isFetching] as const;
}

type JobItemsResponse = {
  jobItems: JobItem[];
  public: boolean;
  sorted: boolean;
};

const fetchJobQuery = async (searchText: string): Promise<JobItemsResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useSearchQuery(
  searchText: string
): readonly [JobItem[] | undefined, boolean] {
  const { data, isFetching } = useQuery(
    ["job-items", searchText],
    () => fetchJobQuery(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: (e) => handleError(e),
    }
  );
  return [data?.jobItems, isFetching] as const;
}

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: (e: unknown) => handleError(e),
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);
  const isLoading = results.some((result) => result.isFetching);

  return [jobItems, isLoading] as const;
};

export function useDebounced<T>(value: T, timeOut: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), timeOut);
    return () => clearTimeout(timerId);
  }, [value, timeOut]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initValue: T) {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClickListener = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        // !buttonRef.current?.contains(e.target) &&
        // !popoverRef.current?.contains(e.target)
        // !e.target.closest(".bookmarks-btn") &&
        // !e.target.closest(".bookmarks-popover")
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };
    document.addEventListener("click", handleClickListener);

    return () => {
      document.removeEventListener("click", handleClickListener);
    };
  }, [handler, refs]);
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a useActiveIdProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a useSearchTextProvider"
    );
  }
  return context;
}

export function useJobItemContext() {
  const context = useContext(JobItemContext);
  if (!context) {
    throw new Error(
      "useJobItemContext must be used within a useJobItemContextProvider"
    );
  }
  return context;
}
