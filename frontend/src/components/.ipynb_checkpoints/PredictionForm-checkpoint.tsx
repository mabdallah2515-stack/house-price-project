import { useState } from "react";
import type { HouseData } from "../types/prediction";
import { predictHousePrice } from "../api/predictionClient";

interface PredictionFormProps {
  onResult: (price: number) => void;
}

export default function PredictionForm({
  onResult,
}: PredictionFormProps) {
  const [formData, setFormData] = useState<HouseData>({
    Area: 1000,
    Bedrooms: 2,
    Bathrooms: 2,
    Floors: 1,
    Location: "",
    Condition: "Good",
    Garage: "Yes",
    Age: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Area" ||
        name === "Bedrooms" ||
        name === "Bathrooms" ||
        name === "Floors" ||
        name === "Age"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (formData.Area <= 0) {
      setError("Area must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      const result = await predictHousePrice(formData);

      onResult(result.predicted_price);
    } catch {
      setError(
        "Something went wrong. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <h2>House Details</h2>

      <label>Area (sqft)</label>
      <input
        type="number"
        name="Area"
        value={formData.Area}
        onChange={handleChange}
        min="1"
        required
      />

      <label>Bedrooms</label>
      <input
        type="number"
        name="Bedrooms"
        value={formData.Bedrooms}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Bathrooms</label>
      <input
        type="number"
        name="Bathrooms"
        value={formData.Bathrooms}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Floors</label>
      <input
        type="number"
        name="Floors"
        value={formData.Floors}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Location</label>
      <input
        type="text"
        name="Location"
        value={formData.Location}
        onChange={handleChange}
        placeholder="Enter location"
        required
      />

      <label>Condition</label>
      <select
        name="Condition"
        value={formData.Condition}
        onChange={handleChange}
      >
        <option value="Good">Good</option>
        <option value="Excellent">Excellent</option>
        <option value="Fair">Fair</option>
        <option value="Poor">Poor</option>
      </select>

      <label>Garage</label>
      <select
        name="Garage"
        value={formData.Garage}
        onChange={handleChange}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label>Age</label>
      <input
        type="number"
        name="Age"
        value={formData.Age}
        onChange={handleChange}
        min="0"
        required
      />

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict House Price"}
      </button>
    </form>
  );
}