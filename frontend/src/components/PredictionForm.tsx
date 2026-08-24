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
    field: keyof HouseData,
    value: string | number
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await predictHousePrice(formData);
      onResult(result.predicted_price);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the prediction server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      
      <div className="form-grid">

        {/* Area */}
        <div className="form-group">
          <label>Area</label>
          <div className="input-wrapper">
            <input
              type="number"
              min="1"
              value={formData.Area}
              onChange={(e) =>
                handleChange("Area", Number(e.target.value))
              }
              required
            />
            <span>sqft</span>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="form-group">
          <label>Bedrooms</label>
          <input
            type="number"
            min="1"
            value={formData.Bedrooms}
            onChange={(e) =>
              handleChange("Bedrooms", Number(e.target.value))
            }
            required
          />
        </div>

        {/* Bathrooms */}
        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            min="1"
            value={formData.Bathrooms}
            onChange={(e) =>
              handleChange("Bathrooms", Number(e.target.value))
            }
            required
          />
        </div>

        {/* Floors */}
        <div className="form-group">
          <label>Floors</label>
          <input
            type="number"
            min="1"
            value={formData.Floors}
            onChange={(e) =>
              handleChange("Floors", Number(e.target.value))
            }
            required
          />
        </div>

        {/* Location */}
        <div className="form-group full-width">
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={formData.Location}
            onChange={(e) =>
              handleChange("Location", e.target.value)
            }
            required
          />
        </div>

        {/* Condition */}
        <div className="form-group">
          <label>House Condition</label>

          <select
            value={formData.Condition}
            onChange={(e) =>
              handleChange("Condition", e.target.value)
            }
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        {/* Garage */}
        <div className="form-group">
          <label>Garage</label>

          <select
            value={formData.Garage}
            onChange={(e) =>
              handleChange("Garage", e.target.value)
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Age */}
        <div className="form-group">
          <label>House Age</label>

          <div className="input-wrapper">
            <input
              type="number"
              min="0"
              value={formData.Age}
              onChange={(e) =>
                handleChange("Age", Number(e.target.value))
              }
              required
            />
            <span>years</span>
          </div>
        </div>

      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <button
        className="predict-button"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Predicting...
          </>
        ) : (
          <>
            🔮 Predict House Price
          </>
        )}
      </button>

    </form>
  );
}