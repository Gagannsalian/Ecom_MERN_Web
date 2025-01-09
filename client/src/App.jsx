import Nav from "./Components/Navbar/Nav";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login"
import "./index.css";
import AddProduct from './Components/Product/AddProduct';

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

            <Route path="/" element={<h1>Product listing component</h1>} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<h1> UPDATE Product component</h1>}/>
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
