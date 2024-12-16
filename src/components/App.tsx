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

function App() {
  //state
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchText = useDebounced(searchText, 750);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);

  //dervied / computed state
  const numberOfResults = jobItems?.length || 0;
  const numberOfPages = Math.ceil(numberOfResults / 7);
  const jobItemsSliced = jobItems?.slice(0, 7) || [];

  //event handlers / actions
  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
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
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handleChangePage}
            currentPage={currentPage}
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
