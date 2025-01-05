import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} Developed by Gagan N Salian. All rights reserved.</p>
                <ul className="footer-links">
                    <li>
                        <a href="/about">About Us</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                    <li>
                        <a href="/privacy">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
