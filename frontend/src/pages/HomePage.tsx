import PredictionForm from "../components/PredictionForm";

interface HomePageProps {
  onResult: (price: number) => void;
}

export default function HomePage({
  onResult,
}: HomePageProps) {
  return (
    <div className="app">

      <header className="hero">

        <div className="hero-icon">
          🏠
        </div>

        <div>
          <h1>House Price Prediction</h1>

          <p>
            Estimate the market value of a house
            using Machine Learning.
          </p>
        </div>

      </header>

      <main className="main">

        <div className="card">

          <div className="card-header">
            <h2>Property Information</h2>

            <p>
              Enter the details of the property below
              to get an estimated price.
            </p>
          </div>

          <PredictionForm onResult={onResult} />

        </div>

      </main>

      <footer>
        <p>
          Powered by Machine Learning • House Price Prediction
        </p>
      </footer>

    </div>
  );
}