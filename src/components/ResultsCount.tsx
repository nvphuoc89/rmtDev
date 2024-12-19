import { useJobItemContext } from "../lib/hooks";

export default function ResultsCount() {
  const { numberOfResults: count } = useJobItemContext();
  return (
    <p className="count">
      <b className="u-bold">{count ?? 0}</b> results
    </p>
  );
}
