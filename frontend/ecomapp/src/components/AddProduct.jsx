import { useState } from "react";
import styles from "./addproduct.module.css";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    release_Date: "",
    available: false,
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    formData.append("imageFile", imageFile);

    try {
      const response = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          name: "",
          brand: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          release_Date: "",
          available: false,
        });
        setImageFile(null);
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Stock Quantity:</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Release Date:</label>
        <input
          type="date"
          name="release_Date"
          value={product.release_Date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Product Available:</label>
        <input
          type="checkbox"
          name="available"
          checked={product.available}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
