export default function ResultsCount({ count }: { count: number }) {
  return (
    <p className="count">
      <b className="u-bold">{count ?? 0}</b> results
    </p>
  );
}
