import { searchQueryStore } from "../stores/searchQueryStore";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar() {
  const jobItems = searchQueryStore((state) => state.jobItems);
  const isLoading = searchQueryStore((state) => state.isLoading);

  const jobItemsSliced = jobItems.slice(0, 7);
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount count={jobItems.length} />
        <SortingControls />
      </div>
      <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}
