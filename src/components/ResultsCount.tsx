export default function ResultsCount({ count }: { count: number }) {
  return (
    <p className="count">
      <b className="u-bold">{count}</b> results
    </p>
  );
}
