import { createContext } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { JobDetail } from "../types";

export const BookmarksContext = createContext<{
  bookmarkedIds: number[];
  handleBookmarkToggle: (id: number) => void;
  bookmarkedJobItems: JobDetail[];
  isLoading: boolean;
} | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );
  const [bookmarkedJobItems, isLoading] = useJobItems(bookmarkedIds);

  const handleBookmarkToggle = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleBookmarkToggle,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
