import { Link} from 'react-router-dom';

import './Nav.css';

const Nav = () => {
    
    const auth = localStorage.getItem('user');
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
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        {auth   ?   <Link to="/logout">Logout</Link>    :    <Link to="/signup">SignUp</Link>}
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default Nav;
