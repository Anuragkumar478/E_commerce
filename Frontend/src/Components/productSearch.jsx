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
  <form onSubmit={handleSerch}>
    <input type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
/>
<button type="submit">Search</button>
</form>
)
    
};
export default SearchProductBar;
