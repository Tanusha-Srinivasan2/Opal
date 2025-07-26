import { useState } from "react";
import styles from "./nav.module.css";
export default function Search({ onSearch }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className={styles.input}
        placeholder="Search for products..."
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
