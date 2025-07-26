import styles from "./productdetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Product deleted successfully");
          navigate("/");
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product");
      }
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!res.ok) {
        setError("Product not found");

        return;
      }
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* Left section - product details */}
      <div className={styles.details}>
        <h2 className={styles.title}>{product.name}</h2>

        <p className={styles.detailItem}>
          <span className={styles.label}>Description:</span>{" "}
          {product.description}
        </p>

        <p className={styles.detailItem}>
          <span className={styles.label}>Price:</span> ₹
          {product.price.toLocaleString()}
        </p>

        <p className={styles.detailItem}>
          <span
            className={`${styles.status} ${
              !product.available ? styles.outOfStock : ""
            }`}
          >
            {product.available ? "In stock" : "Out of stock"}
          </span>
        </p>

        <p className={styles.detailItem}>
          <span className={styles.label}>Category:</span> {product.category}
        </p>

        <p className={styles.detailItem}>
          <span className={styles.label}>Release Date:</span>{" "}
          {new Date(product.release_Date).toLocaleDateString()}
        </p>

        <button
          onClick={() => navigate(`/update-product/${product.id}`)}
          className={styles.updateButton}
        >
          Update
        </button>

        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>

        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className={styles.imageWrapper}>
        <img
          className={styles.productimage}
          src={`http://localhost:8080/api/product/${product.id}/image`}
          alt={product.name}
        />
      </div>
    </div>
  );
}
