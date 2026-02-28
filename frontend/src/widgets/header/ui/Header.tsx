import styles from "./Header.module.css";
import logo from "../../../assets/ImagesHeader/logo.png";
import { useNavigate } from "react-router-dom";
import Delivery from "./Delivery";
import Bonuses from "./Bonuses";
import ToWishlist from "./ToWishlist";
import Links from "./Links";
import Menu from "./Menu";
import Profile from "./Profile";
import CartDrawer from "../../cart/ui/CartDrawer";
import Search from "../../../features/search";

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
          <Menu />
          <div className="deviderVertical" />
          <div className={styles.icons}>
            <div className={styles.wishlist}>
              <ToWishlist />
            </div>

            <CartDrawer />
          </div>
        </div>
      </div>
      <div className="devider" />
      <div className="container">
        <div className={styles.bottom}>
          <Links />
        </div>
      </div>
      <Profile />
    </header>
  );
}

export default Header;
