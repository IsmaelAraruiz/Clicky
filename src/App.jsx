import ItemListContainer from "./pages/ItemListContainer";
import Layout from "./components/others/Layout";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import ThemeProvider from "./context/ThemeProvider";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";


const App = () => {
  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter basename="/Clicky">
            <Layout>
              <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:categoryId" element={<ItemListContainer />} />
                <Route path="/detail/:id" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-details" element={<OrderDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
