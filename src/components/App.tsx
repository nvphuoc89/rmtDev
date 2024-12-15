import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import { useDebounced, useJobItems } from "../lib/hooks";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
import JobDetailContent from "./JobDetailContent";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounced(searchText, 750);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);
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
        <Sidebar jobItems={jobItems ?? []} isLoading={isLoading} />
        <JobDetailContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
