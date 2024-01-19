import { useEffect, useRef, useState } from "react";
import Box from "./components/box/Box";

function App() {
  // const [rates, setRates] = useState({});
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(1);

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/ca4add3055b90752619c01a9/latest/USD"
    )
      .then((res) => res.json())
      .then((data) => {
        // setRates(data.conversion_rates);
        ratesRef.current = data.conversion_rates;
        onChangeToValue(1);
      })
      .catch((err) => alert("Failed to request data!"));
  }, []);

  useEffect(() => {
    onChangeFromValue(fromValue);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToValue(toValue);
  }, [toCurrency]);

  const onChangeFromValue = (value) => {
    // const result = (value / rates[fromCurrency]) * rates[toCurrency];
    const result =
      (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setFromValue(value);
    setToValue(result.toFixed(2));
  };

  const onChangeToValue = (value) => {
    // const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromValue(result.toFixed(2));
    setToValue(value);
  };

  return (
    <div className="App">
      <Box
        value={fromValue}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromValue}
      />
      <Box
        value={toValue}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToValue}
      />
    </div>
  );
}

export default App;

// ------------------------
