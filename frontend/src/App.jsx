import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookDetails from "./pages/BooksDetail";
import EditBookPage from "./pages/Editbook";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import NewBookPage from "./pages/NewBooks";
import Register from "./pages/Register";

function App() {
  return (
    <VStack minH="100vh" minW="100vw">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/gallery"} element={<Gallery />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/newbook"} element={<NewBookPage />} />
          <Route path={"/books/:id"} element={<BookDetails />} />
          <Route path={"/editbook/:id"} element={<EditBookPage />} />
          <Route path={"*"} element={<h1> Error reading database </h1>} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
