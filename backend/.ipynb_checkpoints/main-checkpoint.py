from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(
    title="House Price Prediction API"
)

# Load model
model = joblib.load("house_price.pkl")


class HouseData(BaseModel):
    Area: float
    Bedrooms: int
    Bathrooms: int
    Floors: int
    Location: str
    Condition: str
    Garage: str
    Age: int


@app.get("/")
def home():
    return {
        "message": "House Price Prediction API is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/predict")
def predict(data: HouseData):

    input_data = pd.DataFrame([{
        "Area": data.Area,
        "Bedrooms": data.Bedrooms,
        "Bathrooms": data.Bathrooms,
        "Floors": data.Floors,
        "Location": data.Location,
        "Condition": data.Condition,
        "Garage": data.Garage,
        "Age": data.Age
    }])

    prediction = model.predict(input_data)[0]

    return {
        "predicted_price": float(prediction)
    }
    