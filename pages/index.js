import { useEffect, useState } from "react";
import { fetchCars, deleteCar } from "../api";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars()
      .then((response) => response.data)
      .then(setCars)
      .catch((error) => console.log("Error fetching cars:", error));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this car?")) {
      deleteCar(id)
        .then(() => {
          alert("Car deleted successfully");
          setCars(cars.filter((car) => car.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting car:", error);
          alert("Failed to delete the car");
        });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Cars</h1>
      <Link legacyBehavior href="/add">
        <a className={styles.button}>Add a New Car</a>
      </Link>
      <ul className={styles.list}>
        {cars.map((car) => (
          <li key={car.id} className={styles.item}>
            {car.brand} {car.model} - {car.year}
            <div>
              <Link legacyBehavior href={`/cars/${car.id}`}>
                <a className={styles.link}>Edit</a>
              </Link>
              <button
                onClick={() => handleDelete(car.id)}
                className={styles.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
