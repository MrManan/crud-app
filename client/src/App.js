import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
