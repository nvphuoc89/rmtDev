import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import { useDebounced, useJobItems } from "../lib/hooks";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobDetailContent from "./JobDetailContent";
import { Toaster } from "react-hot-toast";
import SortingControls from "./SortingControls";
import ResultsCount from "./ResultsCount";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { RESULT_PER_PAGE } from "../lib/constants";
import { SortBy } from "../types";

function App() {
  //state
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchText = useDebounced(searchText, 750);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);
  const [sortBy, setsortBy] = useState<SortBy>("relevant");

  //dervied / computed state
  const numberOfResults = jobItems?.length || 0;
  const numberOfPages = Math.ceil(numberOfResults / RESULT_PER_PAGE);
  const sortedJobItems =
    jobItems?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      }
      return 0;
    }) || [];

  const jobItemsSliced = sortedJobItems.slice(
    (currentPage - 1) * RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  );

  //event handlers / actions
  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (sortBy: SortBy) => {
    setCurrentPage(1);
    setsortBy(sortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={numberOfResults} />
            <SortingControls sortBy={sortBy} onClick={handleSortChange} />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handleChangePage}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </Sidebar>
        <JobDetailContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
