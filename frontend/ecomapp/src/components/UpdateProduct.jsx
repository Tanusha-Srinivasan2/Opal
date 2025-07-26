import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./updateproduct.module.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    release_Date: "",
    available: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct({
          name: data.name ?? "",
          brand: data.brand ?? "",
          description: data.description ?? "",
          price: data.price ?? "",
          category: data.category ?? "",
          quantity: data.quantity ?? "",
          release_Date: formatDate(data.release_Date ?? data.releaseDate),
          available: data.available ?? false,
        });
        setImagePreview(`http://localhost:8080/api/product/${id}/image`);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const productWithId = { ...product, id };

    formData.append(
      "product",
      new Blob([JSON.stringify(productWithId)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const res = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/");
      } else {
        const errorText = await res.text();
        console.error("Update failed:", errorText);
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Brand</label>
        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Price</label>
        <input
          name="price"
          type="number"
          value={
            product.price === null || product.price === undefined
              ? ""
              : product.price
          }
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Jewellery">Jewellery</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Quantity</label>
        <input
          name="quantity"
          type="number"
          value={
            product.quantity === null || product.quantity === undefined
              ? ""
              : product.quantity
          }
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Release Date</label>
        <input
          name="release_Date"
          type="date"
          value={product.release_Date || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Product Available</label>
        <input
          name="available"
          type="checkbox"
          checked={!!product.available}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.imagePreview}
          />
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Update Product
      </button>
    </form>
  );
}
