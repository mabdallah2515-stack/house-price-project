import PredictionForm from "../components/PredictionForm";

interface HomePageProps {
  onResult: (price: number) => void;
}

export default function HomePage({
  onResult,
}: HomePageProps) {
  return (
    <div className="page">
      <h1>🏠 House Price Prediction</h1>

      <p>
        Enter the house details and our machine learning
        model will predict its price.
      </p>

      <PredictionForm onResult={onResult} />
    </div>
  );
}