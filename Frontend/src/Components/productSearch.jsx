import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../utils/api";

function SearchProductBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full gap-2"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          flex-1
          min-w-0
          border-2
          border-gray-500
          rounded-2xl
          px-3
          py-1.5
          text-sm
          sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-black
          focus:border-green-900
        "
      />
      <button
        type="submit"
        className="
          shrink-0
          bg-black
          text-white
          px-3
          sm:px-4
          py-1.5
          sm:py-2
          text-sm
          sm:text-base
          rounded-full
          hover:bg-blue-700
          transition
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchProductBar;