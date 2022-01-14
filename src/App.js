import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ReviewsList from "./components/ReviewsList";
import Nav from "./components/Nav";
import { useState } from "react";
import Footer from "./components/Footer";
import Missing from "./Missing";
import Review from "./components/Review";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ReviewsList />} />
          <Route path="/reviews" element={<ReviewsList />} />
          <Route path="/reviews/category" element={<ReviewsList />} />
          <Route
            path="/reviews/category/:category_id"
            element={<ReviewsList />}
          />{" "}
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
