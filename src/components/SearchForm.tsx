import { useState } from "react";
import { useDebounced, useSearchRequest } from "../lib/hooks";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText, 250);
  useSearchRequest(debouncedSearchText);

  return (
    <form action="#" className="search" onSubmit={(e) => e.preventDefault()}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
