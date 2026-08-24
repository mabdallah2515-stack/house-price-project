interface ResultPageProps {
  price: number | null;
  onBack: () => void;
}

export default function ResultPage({
  price,
  onBack,
}: ResultPageProps) {
  return (
    <div className="page result-page">
      <h1>Prediction Result</h1>

      {price !== null ? (
        <>
          <h2>Predicted House Price</h2>

          <div className="price">
            {price.toLocaleString()}
          </div>

          <p>
            This is the price predicted by the machine
            learning model.
          </p>
        </>
      ) : (
        <p>No prediction available.</p>
      )}

      <button onClick={onBack}>
        Predict Another House
      </button>
    </div>
  );
}