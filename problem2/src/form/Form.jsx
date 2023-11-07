import { useState, useEffect } from "react";
import SelectCurency from "./SelectCurency";
import axios from "axios";
function Form() {
  const [tokens, setTokens] = useState();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [switchCurenncy, setSwitchCurenncy] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(
          "https://interview.switcheo.com/prices.json"
        );
        setTokens(res.data);
        setLoader(false);
      } catch (error) {
        setLoader(true);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fromCurrencySelected = tokens.find(
        (token) => token.currency === fromCurrency
      );
      const toCurrencySelected = tokens.find(
        (token) => token.currency === toCurrency
      );
      const rate = fromCurrencySelected.price / toCurrencySelected.price;
      setExchangeRate(rate);
      setSwitchCurenncy(false);
      setLoader(true);

      const resultCurency = setTimeout(() => {
        setLoader(false);
      }, 2000);
      return () => clearTimeout(resultCurency);
    }
  }, [fromCurrency, toCurrency, tokens, exchangeRate, switchCurenncy]);
  const handleSwich = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setSwitchCurenncy((switchCurenncy) => !switchCurenncy);
  };
  return (
    <div className="container">
      <h1>Currency Swap Form</h1>
      <div className="form-container">
        <input
          className="input-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <SelectCurency
          selectedCurrency={setFromCurrency}
          currency={fromCurrency}
          tokens={tokens}
          title="from"
        />
        <div className="switch" onClick={handleSwich}>switch</div>
        <SelectCurency
          selectedCurrency={setToCurrency}
          currency={toCurrency}
          tokens={tokens}
          title="to"
        />
      </div>
      {loader ? (
        <img className="result" src="./Spinner-1s-24px.gif" alt="1" />
      ) : (
        loader&& exchangeRate &&  <h2 className="result">
          {fromCurrency} = {(amount * exchangeRate).toFixed(6)}
          {toCurrency}
        </h2>
      )}
    </div>
  );
}

export default Form;
