import { useState } from "react";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [price, setPrice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  function handleResult(predictedPrice: number) {
    setPrice(predictedPrice);
    setShowResult(true);
  }

  function handleBack() {
    setShowResult(false);
    setPrice(null);
  }

  if (showResult) {
    return (
      <ResultPage
        price={price}
        onBack={handleBack}
      />
    );
  }

  return <HomePage onResult={handleResult} />;
}

export default App;