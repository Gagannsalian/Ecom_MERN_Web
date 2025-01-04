import {Link} from 'react-router-dom';

const Nav=()=>{
    return(
        <>
            <ul className='nav_ul'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </>
    )
}

export default Nav;