import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Currencydropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
  isDarkMode, // Receive the isDarkMode prop
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      <label htmlFor={title} className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
        {title}
      </label>

      <div className="mt-1 relative">
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={`w-full p-2 pr-10 border rounded-lg shadow-lg focus:outline-none focus:ring-2 ${
              isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "border-cyan-500"
            }`}
          >

            {/* Favorites */}
            
            {favorites.map((curr) => (
              <option className="bg-gray-200" value={curr} key={curr}>
                <img
                  src={`https://flagcdn.com/${curr.toLowerCase()}.svg`}
                  alt={`${curr} flag`}
                  style={{ width: "20px", marginRight: "8px" }}
                />
                {curr}
              </option>
            ))}
            <hr />

            {/* Remaining currencies */}
            {currencies
              .filter((c) => !favorites.includes(c))
              .map((curr) => (
                <option value={curr} key={curr}>
                  <img
                    src={`https://flagcdn.com/${curr.toLowerCase()}.svg`}
                    alt={`${curr} flag`}
                    style={{ width: "20px", marginRight: "8px" }}
                  />
                  {curr}
                </option>
              ))}
          </select>

          <button
            onClick={() => handleFavorite(currency)}
            className="absolute inset-y-0 right-6 flex items-center text-sm leading-5"
          >
            {isFavorite(currency) ? <HiStar className="text-yellow-400" /> : <HiOutlineStar />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Currencydropdown;
