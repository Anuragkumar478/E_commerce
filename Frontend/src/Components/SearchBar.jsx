// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search books..." }) => {
    const [query, setQuery] = useState('');
    
    // Debounce implementation
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300); // 300ms delay
        
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                
                {/* Search Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                {/* Clear Button */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;