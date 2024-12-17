import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

export const BookmarksContext = createContext<{
  bookmarkedIds: number[];
  handleBookmarkToggle: (id: number) => void;
}>({ bookmarkedIds: [], handleBookmarkToggle: () => {} });

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const handleBookmarkToggle = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleBookmarkToggle }}>
      {children}
    </BookmarksContext.Provider>
  );
}
