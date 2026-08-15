import {useeffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../utils/api";

function SearchProductBar() {
    const [query,setQuery]=useState("");
    const navigate=useNavigate();
    const handleSerch= (e)=>{
       e.preventDefault();
         console.log("Searching:", query);

       if(!query.trim())return;
       navigate(`/search?query=${encodeURIComponent(query)}`);
    }; 


return(
  <form onSubmit={handleSerch} className="flex items-center space-x-2 " >
    <input 
    className=" border-amber-500 border-2 rounded-2xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
/>
<button className="bg-black text-white px-4 py-2 rounded-full hover:bg-blue-700 transition "
 type="submit">Search</button>
</form>
)
    
};
export default SearchProductBar;
