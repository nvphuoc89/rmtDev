import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";
import { JobDetail, JobItem } from "../types";
import toast from "react-hot-toast";

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
      // onError: (e) => console.log(e),
    }
  );
  return [data?.jobItem, isFetching] as const;
}

type JobItemsResponse = {
  jobItems: JobItem[];
  public: boolean;
  sorted: boolean;
};

const fetchJobItems = async (searchText: string): Promise<JobItemsResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItems(
  searchText: string
): readonly [JobItem[] | undefined, boolean] {
  const { data, isFetching } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError(err: Error) {
        toast.error(err.message);
      },
    }
  );
  return [data?.jobItems, isFetching] as const;
}

export function useDebounced<T>(value: T, timeOut: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), timeOut);
    return () => clearTimeout(timerId);
  }, [value, timeOut]);

  return debounced;
}
