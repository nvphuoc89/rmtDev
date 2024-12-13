import { useEffect } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
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
  }, []);
}

function App() {
  useSelectedJobItem();

  return (
    <>
      <Background />
      <Header />
      <Container />
      <Footer />
    </>
  );
}

export default App;
