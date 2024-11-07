import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ search, setSearch, searchPressed }) => (
    <div className="pt-4">
        <input
            className="bg-white h-fit input  border-2 border-yellow-300 input-primary w-full max-w-xs"
            type="text"
            placeholder="Enter city/town..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <button
            className="pl-4"
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
