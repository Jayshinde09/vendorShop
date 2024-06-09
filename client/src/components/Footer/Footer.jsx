import "./Footer.css";
import {Link} from "react-router-dom";

function Footer(){
    return(
        <>
        <div className="footer-main-div">
            <div>
                <div className="footer-header">Hindustan - Ceramic</div>
                <div>Contact: +91 95954 28091</div>
                <div>Email: bhushanchougule4@gmail.com</div>
                <div>Location: Near Dmart Jaysinhpur</div>
            </div>
            <div>
                <div className="footer-header">Account</div>
                <ul>
                    <li className="footer-links"><Link >User Login</Link></li>
                    <li className="footer-links"><Link>Admin Login</Link></li>
                    <li className="footer-links"><Link>Labour Login</Link></li>
                </ul>
            </div>
            <div>
                <div className="footer-header">Links</div>
                <ul>
                    <li className="footer-links"><Link>Home</Link></li>
                    <li className="footer-links"><Link>Products</Link></li>
                    <li className="footer-links"><Link>About Us</Link></li>
                </ul>
            </div>
            <div>
                <div className="footer-header">Social Media</div>
                <ul>
                    <li className="footer-links"><Link>Instagram</Link></li>
                    <li className="footer-links"><Link>Facebook</Link></li>
                    <li className="footer-links"><Link>Twitter</Link></li>
                </ul>
            </div>
        </div>
        <div className="copyright-div">
            Copyright © 2023 | Hindustan Ceramic | All Rights Reserved
        </div>
        </>
    )
}
export default Footer;