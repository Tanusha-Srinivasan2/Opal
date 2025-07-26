import { useState, useEffect } from "react";
import AddProduct from "./components/AddProduct";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      let url = "http://localhost:8080/api/products";
      if (search) {
        url = `http://localhost:8080/api/product/search?keyword=${encodeURIComponent(
          search
        )}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, [search]);
  return (
    <Router>
      <Nav onSearch={setSearch} />
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
