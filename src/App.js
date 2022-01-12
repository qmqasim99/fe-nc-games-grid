import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ReviewsList from "./components/ReviewsList";
import Nav from "./components/Nav";
import { useState } from "react";
import Footer from "./components/Footer";
import Missing from "./Missing";

function App() {
  const [category, setCategory] = useState("all");

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav category={category} setCategory={setCategory} />
        <Routes>
          <Route path="/" element={<ReviewsList category={category} />} />
          <Route
            path="/reviews"
            element={<ReviewsList category={category} />}
          />
          <Route
            path="/reviews/category"
            element={<ReviewsList category={category} />}
          />
          <Route
            path="/reviews/category/:category_id"
            element={
              <ReviewsList category={category} setCategory={setCategory} />
            }
          />

          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
