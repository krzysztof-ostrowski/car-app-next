import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchCar, updateCar } from "../../api";
import Link from "next/link";
import styles from "../../styles/CarDetails.module.css";

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (id) {
      fetchCar(id)
        .then((response) => setCar(response.data))
        .catch((error) => console.error("Error fetching car:", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(id, { brand, model, year });
      alert("Car updated successfully");
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update the car");
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Car Details</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Brand:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Update Car
        </button>
        <Link href="/" className={styles.link}>
          Cancel
        </Link>{" "}
      </form>
    </div>
  );
}
