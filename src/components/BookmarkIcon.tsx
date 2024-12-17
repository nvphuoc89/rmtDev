import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleBookmarkToggle } = useBookmarksContext();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleBookmarkToggle(id);
      }}
    >
      <BookmarkFilledIcon
        className={bookmarkedIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
