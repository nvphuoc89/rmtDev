import { useJobItemContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSliced, isLoading } = useJobItemContext();
  return <JobList jobItems={jobItemsSliced} isLoading={isLoading} />;
}
