import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { Direction, JobItem, SortBy } from "../types";
import { RESULT_PER_PAGE } from "../lib/constants";

type JobItemContextProps = {
  jobItems: JobItem[] | undefined;
  jobItemsSliced: JobItem[];
  isLoading: boolean;
  currentPage: number;
  numberOfPages: number;
  numberOfResults: number;
  sortBy: SortBy;
  handleChangePage: (direction: Direction) => void;
  handleSortChange: (sortBy: SortBy) => void;
};

export const JobItemContext = createContext<JobItemContextProps | null>(null);

export default function JobItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //context
  const { debouncedSearchText } = useSearchTextContext();

  //state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobItems, isLoading] = useSearchQuery(debouncedSearchText);
  const [sortBy, setsortBy] = useState<SortBy>("relevant");

  //dervied / computed state
  const numberOfResults = jobItems?.length || 0;
  const numberOfPages = Math.ceil(numberOfResults / RESULT_PER_PAGE);
  const sortedJobItems = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === "recent") {
          return a.daysAgo - b.daysAgo;
        }
        return 0;
      }),
    [jobItems, sortBy]
  );

  const jobItemsSliced = useMemo(
    () =>
      sortedJobItems.slice(
        (currentPage - 1) * RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
      ),
    [currentPage, sortedJobItems]
  );

  //event handlers / actions
  const handleChangePage = useCallback((direction: Direction) => {
    if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  const handleSortChange = useCallback((sortBy: SortBy) => {
    setCurrentPage(1);
    setsortBy(sortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSliced,
      isLoading,
      currentPage,
      numberOfPages,
      numberOfResults,
      sortBy,
      handleChangePage,
      handleSortChange,
    }),
    [
      currentPage,
      handleChangePage,
      handleSortChange,
      isLoading,
      jobItems,
      jobItemsSliced,
      numberOfPages,
      numberOfResults,
      sortBy,
    ]
  );

  return (
    <JobItemContext.Provider value={contextValue}>
      {children}
    </JobItemContext.Provider>
  );
}
