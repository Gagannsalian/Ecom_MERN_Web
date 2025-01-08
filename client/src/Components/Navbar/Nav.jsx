import { Link, useNavigate } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="brand">ShopMe</div>
          {auth ? (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Add Product</Link>
              </li>
              <li>
                <Link to="/update">Update Product</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link onClick={logout} to="/signup">
                  Logout( {JSON.parse(auth).name} )
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                {" "}
                <Link to="/signup">SignUp</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
