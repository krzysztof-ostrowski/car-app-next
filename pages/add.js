import { useState } from "react";
import { createCar } from "../api";
import Router from "next/router";

export default function AddCar() {
  const [car, setCar] = useState({ brand: "", model: "", year: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCar(car);
      alert("Car added successfully!");
      Router.push("/");
    } catch (error) {
      console.error("Failed to add the car", error);
      alert("Failed to add the car");
    }
  };

  return (
    <div>
      <h1>Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={car.brand}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={car.model}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={car.year}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}
