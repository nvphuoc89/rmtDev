import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { searchQueryStore } from "../stores/searchQueryStore";

export default function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const searchRequest = searchQueryStore((state) => state.searchRequest);

  const debounced = useDebouncedCallback((value: string) => {
    if (!value.trim()) return;
    searchRequest(value);
  }, 1000);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    debounced(event.target.value);
  };

  return (
    <form action="#" className="search" onSubmit={handleSubmit}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={handleChange}
      />
    </form>
  );
}
