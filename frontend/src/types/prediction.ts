export interface HouseData {
  Area: number;
  Bedrooms: number;
  Bathrooms: number;
  Floors: number;
  Location: string;
  Condition: string;
  Garage: string;
  Age: number;
}

export interface PredictionResponse {
  predicted_price: number;
}