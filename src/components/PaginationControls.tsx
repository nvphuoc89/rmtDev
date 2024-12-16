import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: "next" | "prev") => void;
  currentPage: number;
  numberOfPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  numberOfPages,
}: PaginationControlsProps) {
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
  direction: "next" | "prev";
  currentPage: number;
  onClick: () => void;
}) {
  const renderPrevNext = (direction: "next" | "prev") => {
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
