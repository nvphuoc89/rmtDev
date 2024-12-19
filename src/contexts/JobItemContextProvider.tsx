import { createContext, useState } from "react";
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
  const sortedJobItems = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  });

  const jobItemsSliced = sortedJobItems.slice(
    (currentPage - 1) * RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  );

  //event handlers / actions
  const handleChangePage = (direction: Direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (sortBy: SortBy) => {
    setCurrentPage(1);
    setsortBy(sortBy);
  };

  return (
    <JobItemContext.Provider
      value={{
        jobItems,
        jobItemsSliced,
        isLoading,
        currentPage,
        numberOfPages,
        numberOfResults,
        sortBy,
        handleChangePage,
        handleSortChange,
      }}
    >
      {children}
    </JobItemContext.Provider>
  );
}
