import { useEffect, useState } from "react";
import Currencydropdown from "./AmountInput";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencySelector = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NOK");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  // Fetch currencies from the API
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const currencyConvert = async () => {
    if (!amount) return;
    setConverting(true);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`max-w-xl mx-auto my-10 p-5 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <h1 className="mb-5 text-2xl font-bold">Currency Converter</h1>

      {/* Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        className={`mb-5 px-4 py-2 rounded ${
          isDarkMode ? "bg-gray-600" : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Dark Mode
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Currencydropdown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
          isDarkMode={isDarkMode} // Pass isDarkMode to the dropdown
        />

        <div className="flex justify-center -mb-1">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-cyan-600 rounded-full cursor-pointer hover:bg-cyan-500"
          >
            <HiArrowsRightLeft className="text-xl text-white" />
          </button>
        </div>

        <Currencydropdown
          favorites={favorites}
          currencies={currencies}
          title="To:"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
          isDarkMode={isDarkMode} // Pass isDarkMode to the dropdown
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium"
        >
          Amount
        </label>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className={`w-full p-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-cyan-500"
          }`}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={currencyConvert}
          className={`px-5 py-2 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 ${
            isDarkMode
              ? "bg-cyan-600 text-white"
              : "bg-cyan-600 text-white"
          } ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
