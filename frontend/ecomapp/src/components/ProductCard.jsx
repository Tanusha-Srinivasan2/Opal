// ProductCard.jsx
import { Link } from "react-router-dom";
import styles from "./product.module.css";

export default function ProductCard({ product }) {
  const availabilityClass = product.available
    ? styles["in-stock"]
    : styles["out-of-stock"];

  return (
    <Link to={`/product/${product.id}`} className={styles.cardLink}>
      <div className={styles.productcard}>
        <img
          className={styles.productimage}
          src={`http://localhost:8080/api/product/${product.id}/image`}
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className={styles.price}>₹{product.price.toLocaleString()}</p>

        <p className={`${styles.available} ${availabilityClass}`}>
          {product.available ? "in-stock" : "out-of-stock"}
        </p>

        <p className={styles.category}>{product.category}</p>

        <p className={styles.releasedate}>
          Released: {new Date(product.release_Date).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
