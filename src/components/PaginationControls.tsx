import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Direction } from "../types";
import { useJobItemContext } from "../lib/hooks";

export default function PaginationControls() {
  const {
    handleChangePage: onClick,
    currentPage,
    numberOfPages,
  } = useJobItemContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => onClick("prev")}
          direction="prev"
          currentPage={currentPage}
        />
      )}
      {currentPage < numberOfPages && (
        <PaginationButton
          onClick={() => onClick("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: {
  direction: Direction;
  currentPage: number;
  onClick: () => void;
}) {
  const renderPrevNext = (direction: Direction) => {
    return direction === "prev" ? (
      <>
        <ArrowLeftIcon />
        Page {currentPage - 1}
      </>
    ) : (
      <>
        Page {currentPage + 1}
        <ArrowRightIcon />
      </>
    );
  };

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        onClick();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {renderPrevNext(direction)}
    </button>
  );
}
