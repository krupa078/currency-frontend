//converter.js
import React, { useState } from 'react';
import './Converter.css';

const Converter = () => {
  const [inr, setInr] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const convertCurrency = async () => {
    try {
      const response = await fetch("https://currency-backend-6p65.onrender.com/convert", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inr })
      })


      const data = await response.json();
      if (data.usd && data.eur) {
        setResult(data);
        setError('');
      } else {
        setError(data.error || 'Conversion failed.');
        setResult(null);
      }
    } catch (err) {
      setError('Failed to fetch conversion rates.');
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={inr}
        onChange={(e) => setInr(e.target.value)}
        placeholder="Enter INR amount"
        className="input"
      />
      <button onClick={convertCurrency} className="button">Convert</button>

      {result && (
        <div className="result">
          <p>USD: {result.usd}</p>
          <p>EUR: {result.eur}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Converter;