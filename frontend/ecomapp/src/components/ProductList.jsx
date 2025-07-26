import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./product.module.css";

export default function ProductList({ products }) {
  return (
    <div className={styles.productlist}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
