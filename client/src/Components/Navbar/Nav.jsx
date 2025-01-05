import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <>
        <nav className="nav">
            <div className="container">
                <div className="brand">
                    ShopMe
                </div>
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
                        <Link to="/logout">Logout</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/signup">SignUp</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default Nav;
