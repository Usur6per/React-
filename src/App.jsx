import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Components from "./pages/components";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import ForwardToHome from "./pages/ForwardToHome";
import AppLayout from "./layouts/AppLayout";
import Todos from "./pages/Todos";
import Carts from "./pages/Carts";
import Products from "./pages/Products";
import { fetchProducts } from "./data/products";
import Login from "./pages/Login/Login";

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const loadedProducts = fetchProducts();
    console.log("Fetched products:", loadedProducts);
    setProducts(loadedProducts);
  }, []);

  useEffect(() => {
    console.log("Products state updated:", products);
    if (products.length > 0) {
      console.log("Sample product:", {
        first: products[0],
        hasThumnail: Boolean(products[0]?.thumbnailUrl),
        hasUrl: Boolean(products[0]?.url),
      });
    }
  }, [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole}/>;
  } else {
    return (
      <BrowserRouter basename="/csi205/">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            <Route path="components" element={<Components />} />
            <Route path="home" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="todos" element={<Todos />} />
            <Route path="login" element={<Login />} />
            <Route
              path="carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route
              path="products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
