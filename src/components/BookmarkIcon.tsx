import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleBookmarkToggle } = useContext(BookmarksContext);

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
