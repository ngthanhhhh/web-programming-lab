import { Link } from "react-router-dom";
function Header(){
    return (
        <header className="header">
            <h2>Beauty Store</h2>
            <nav>
                <Link to="/">Trang chủ</Link>
                <Link to="/about-us">Giới thiệu</Link>
            </nav>
        </header>
    );
}
export default Header;