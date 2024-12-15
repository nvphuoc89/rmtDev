import { JobItem } from "../types";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

type SideBarProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export default function Sidebar({ jobItems, isLoading }: SideBarProps) {
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
