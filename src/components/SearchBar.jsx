import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ search, setSearch, searchPressed }) => (
    <div className=" flex items-center space-x-2">
        <input
            className="bg-transparent text-white placeholder-gray-300 border border-gray-500 rounded-lg px-4 py-2  focus:outline-none  w-full max-w-xs"
            type="text"
            placeholder="Enter city/town..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-purple-900 hover:text-white transition duration-200 focus:outline-none"
            onClick={searchPressed}
        >
            Search
        </button>
    </div>
);

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    searchPressed: PropTypes.func.isRequired,
};

export default SearchBar;
