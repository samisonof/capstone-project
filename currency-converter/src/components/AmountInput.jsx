import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Currencydropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      <label htmlFor={title} className="block text-sm font-medium text-gray-700">
        {title}
      </label>

      <div className="mt-1 relative">
        {/* Container wrapping the select and star icon */}
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 pr-10 border border-cyan-500 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
          >
            {/* Favorites */}
            {favorites.map((currency) => {
              return (
                <option className="bg-gray-200" value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
            <hr />

            {/* Remaining currencies */}
            {currencies
              .filter((c) => !favorites.includes(c))
              .map((currency) => {
                return (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                );
              })}
          </select>

          {/* Star icon positioned inside the select */}
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