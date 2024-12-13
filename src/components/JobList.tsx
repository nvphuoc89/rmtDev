import { searchQueryStore } from "../stores/searchQueryStore";
import { JobItem } from "../types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const selectedJobItemId = searchQueryStore(
    (state) => state.selectedJobItemId
  );

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === selectedJobItemId}
          />
        ))}
    </ul>
  );
}

export default JobList;
