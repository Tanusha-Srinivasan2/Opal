import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import Search from "./Search";

export default function Nav({ onSearch }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Opal</div>
      <ul className={styles["nav-links"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        <div className={styles.cart}>🛒</div>
        <Search onSearch={onSearch} className={styles.search} />
      </div>
    </nav>
  );
}
