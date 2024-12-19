import { createContext } from "react";
import { useDebounced, useLocalStorage } from "../lib/hooks";

type SearchContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (text: string) => void;
};

export const SearchTextContext = createContext<SearchContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useLocalStorage("searchText", "");
  const debouncedSearchText = useDebounced(searchText, 750);

  const handleChangeSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
