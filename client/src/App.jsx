import Nav from "./Components/Navbar/Nav";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login"
import "./index.css";
import AddProduct from './Components/Product/AddProduct';
import ProductList from './Components/ProductList/ProductList';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
// Adjust path if needed

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateComponent from "./Components/Private/PrivateComponent"
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />

        <Routes>

          <Route element={<PrivateComponent />}>

            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>LOGOUT</h1>} />
            <Route path="/profile" element={<h1>PROFILE</h1>} />

          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
