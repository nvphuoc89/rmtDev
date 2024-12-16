import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: "next" | "prev") => void;
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      <button onClick={() => onClick("prev")} className="pagination__button">
        <ArrowLeftIcon />
        Page {currentPage - 1}
      </button>
      <button onClick={() => onClick("next")} className="pagination__button">
        Page {currentPage + 1}
        <ArrowRightIcon />
      </button>
    </section>
  );
}
