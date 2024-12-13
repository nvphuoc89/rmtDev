import { useEffect } from "react";
import { searchQueryStore } from "../stores/searchQueryStore";

export function useSelectedJobItem() {
  const setSelectedJobItem = searchQueryStore(
    (state) => state.setSelectedJobItem
  );

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedJobItem(+window.location.hash.slice(1));
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [setSelectedJobItem]);
}
