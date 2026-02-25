import styles from "./Header.module.css";
import logo from "../../../assets/ImagesHeader/logo.png";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Delivery from "./Delivery";
import Bonuses from "./Bonuses";
import ToWishlist from "./ToWishlist";
import ToCart from "./ToCart";

function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.line}>
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Search />
          <Delivery />
          <div className="deviderVertical" />
          <Bonuses />
          <div className="deviderVertical" />
          <div className={styles.icons}>
            <div className={styles.wishlist}>
              <ToWishlist />
            </div>
            
            <div className={styles.cart}>
              <ToCart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
